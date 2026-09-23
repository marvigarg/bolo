// ===== BOLO BACKEND (Firebase Auth + Firestore) =====
//
// Firestore layout:
//   caregivers/{uid}                                → account: username, PIN hash
//   caregivers/{uid}/patients/{patientId}           → patient: name, language, accessibility
//   caregivers/{uid}/patients/{patientId}/medicines → one doc per medicine
//   caregivers/{uid}/patients/{patientId}/logs      → one doc per reminder (confirmed or missed)
//
// There's one patient per account for now; the patients collection leaves room for more later.
// If firebase-config.js has placeholder values, nothing is saved and the app runs offline.

var BoloBackend = (function() {
  var enabled = typeof firebase !== 'undefined' &&
    typeof BOLO_FIREBASE_CONFIG !== 'undefined' &&
    BOLO_FIREBASE_CONFIG.apiKey !== 'YOUR_API_KEY'

  var auth = null
  var db = null
  var currentUser = null
  var patientId = null
  var pinHash = null // cached so unlocking doesn't need the internet

  if (enabled) {
    firebase.initializeApp(BOLO_FIREBASE_CONFIG)
    auth = firebase.auth()
    db = firebase.firestore()
  } else {
    console.info('Bolo: Firebase not configured, running offline')
  }

  // Firebase Auth needs an email, so usernames become a fake address. No email is ever sent.
  var USERNAME_DOMAIN = '@users.bolo.app'

  function usernameToEmail(username) {
    return username.trim().toLowerCase() + USERNAME_DOMAIN
  }

  function caregiverDoc() {
    return db.collection('caregivers').doc(currentUser.uid)
  }

  function patientDoc() {
    return caregiverDoc().collection('patients').doc(patientId)
  }

  function friendlyAuthError(err) {
    switch (err && err.code) {
      case 'auth/email-already-in-use': return 'That username is already taken'
      case 'auth/weak-password': return 'Password must be at least 6 characters'
      case 'auth/invalid-email': return 'Usernames can only use letters, numbers, dots, dashes and underscores'
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential': return 'Wrong username or password'
      case 'auth/too-many-requests': return 'Too many tries, please wait a minute'
      case 'auth/network-request-failed': return 'No internet connection, please try again'
      default: return 'Something went wrong, please try again'
    }
  }

  // Firestore only resolves a write once the server has it, which never happens offline
  function withTimeout(promise, message) {
    var timeout = new Promise(function(resolve, reject) {
      setTimeout(function() { reject(new Error(message)) }, 10000)
    })
    return Promise.race([promise, timeout])
  }

  // The PIN is stored as a SHA-256 hash, salted with the account id, never as the digits themselves
  function hashPin(pin) {
    var salt = currentUser ? currentUser.uid : 'offline'
    if (!window.crypto || !window.crypto.subtle) return Promise.resolve('plain:' + pin)
    var bytes = new TextEncoder().encode(salt + ':' + pin)
    return window.crypto.subtle.digest('SHA-256', bytes).then(function(buffer) {
      return Array.from(new Uint8Array(buffer)).map(function(b) {
        return b.toString(16).padStart(2, '0')
      }).join('')
    })
  }

  function medicineFields(med) {
    return {
      name: med.name,
      dosage: med.dosage,
      count: med.count,
      startCount: med.startCount,
      time: med.time,
      days: med.days,
      frequency: med.frequency,
      notes: med.notes,
      startDate: med.startDate,
      endDate: med.endDate
    }
  }

  function warn(action) {
    return function(err) { console.warn('Bolo: could not ' + action, err) }
  }

  function signIn(method, username, password) {
    return auth[method](usernameToEmail(username), password)
      .then(function(cred) {
        currentUser = cred.user
        return cred.user
      })
      .catch(function(err) { throw new Error(friendlyAuthError(err)) })
  }

  return {
    isEnabled: function() { return enabled },

    // Calls back once on page load with the signed-in user, or null
    onAuthReady: function(callback) {
      if (!enabled) { callback(null); return }
      var unsubscribe = auth.onAuthStateChanged(function(user) {
        unsubscribe()
        currentUser = user
        callback(user)
      })
    },

    signUp: function(username, password) {
      return signIn('createUserWithEmailAndPassword', username, password)
    },

    logIn: function(username, password) {
      return signIn('signInWithEmailAndPassword', username, password)
    },

    logOut: function() {
      if (!enabled) { location.reload(); return }
      auth.signOut().then(function() { location.reload() })
    },

    // Re-checks the account password, used when the caregiver forgets their PIN
    verifyPassword: function(password) {
      var credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, password)
      return currentUser.reauthenticateWithCredential(credential)
        .catch(function(err) { throw new Error(friendlyAuthError(err)) })
    },

    // Resolves { patient, medicines, logs }, or null if no patient was set up yet
    loadProfile: function() {
      if (!enabled || !currentUser) return Promise.resolve(null)
      var patientSnap = null
      return caregiverDoc().get()
        .then(function(caregiverSnap) {
          pinHash = caregiverSnap.exists ? caregiverSnap.data().pinHash || null : null
          return caregiverDoc().collection('patients').limit(1).get()
        })
        .then(function(patients) {
          if (patients.empty) return null
          patientSnap = patients.docs[0]
          patientId = patientSnap.id
          return Promise.all([
            patientDoc().collection('medicines').get(),
            patientDoc().collection('logs').orderBy('remindedAt', 'desc').limit(50).get()
          ])
        })
        .then(function(results) {
          if (!results) return null
          return {
            patient: patientSnap.data(),
            medicines: results[0].docs.map(function(doc) {
              return Object.assign({ id: doc.id }, doc.data())
            }),
            logs: results[1].docs.map(function(doc) {
              var log = doc.data()
              return {
                medicineName: log.medicineName,
                dosage: log.dosage,
                status: log.status,
                method: log.method,
                scheduledFor: log.scheduledFor.toDate(),
                remindedAt: log.remindedAt.toDate(),
                confirmedAt: log.confirmedAt ? log.confirmedAt.toDate() : null
              }
            })
          }
        })
        .catch(function(err) {
          console.warn('Bolo: could not load profile', err)
          throw new Error('Could not load your data. Check your internet and try again.')
        })
    },

    hasPin: function() { return pinHash !== null },

    setPin: function(pin) {
      return hashPin(pin).then(function(hash) {
        pinHash = hash
        if (!enabled || !currentUser) return
        var save = caregiverDoc().set({ pinHash: hash }, { merge: true })
        return withTimeout(save, 'Could not save the PIN. Check your internet and try again.')
      })
    },

    checkPin: function(pin) {
      return hashPin(pin).then(function(hash) { return hash === pinHash })
    },

    savePatient: function(patient) {
      if (!enabled || !currentUser) return Promise.resolve()
      if (!patientId) patientId = caregiverDoc().collection('patients').doc().id
      caregiverDoc().set({ username: currentUser.email.replace(USERNAME_DOMAIN, '') }, { merge: true })
        .catch(warn('save account'))
      var data = Object.assign({ updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, patient)
      return patientDoc().set(data, { merge: true }).catch(warn('save patient'))
    },

    // Saves a new medicine and sets med.id so later updates hit the same doc
    saveMedicine: function(med) {
      if (!enabled || !currentUser) return Promise.resolve()
      var ref = patientDoc().collection('medicines').doc()
      med.id = ref.id
      return ref.set(medicineFields(med)).catch(warn('save medicine'))
    },

    updateMedicine: function(med) {
      if (!enabled || !currentUser || !med.id) return Promise.resolve()
      return patientDoc().collection('medicines').doc(med.id)
        .update({ count: med.count, endDate: med.endDate })
        .catch(warn('update medicine'))
    },

    deleteMedicine: function(med) {
      if (!enabled || !currentUser || !med.id) return Promise.resolve()
      return patientDoc().collection('medicines').doc(med.id).delete()
        .catch(warn('delete medicine'))
    },

    // entry: { medicineName, dosage, scheduledFor, remindedAt, confirmedAt (Date or null),
    //          status: 'confirmed' | 'missed', method: 'voice' | 'tap' | '' , tabletsLeft }
    logDose: function(entry) {
      if (!enabled || !currentUser) return Promise.resolve()
      return patientDoc().collection('logs').add(entry).catch(warn('save log'))
    }
  }
})()
