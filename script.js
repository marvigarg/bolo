// ===== SCREENS =====

var SCREENS = [
  'homeScreen', 'authScreen', 'whoScreen', 'nameScreen', 'accessibilityScreen', 'languageScreen',
  'pinSetupScreen', 'medicineScreen', 'medicineAddedScreen', 'patientHomeScreen', 'caregiverScreen'
]

function showScreen(id) {
  SCREENS.forEach(function(screenId) {
    document.getElementById(screenId).style.display = screenId === id ? 'flex' : 'none'
  })
}

function showError(el, message) {
  el.textContent = message
  el.style.display = 'block'
}

// 'setup' while the caregiver fills in the forms, then 'patient' or 'caregiver'
var mode = 'setup'
var patientName = ''
var setupFor = 'self'
var medicines = []
var doseLog = [] // newest first

// ===== START: restore a signed-in session =====

BoloBackend.onAuthReady(function(user) {
  if (!user) return
  BoloBackend.loadProfile()
    .then(function(profile) { continueWithProfile(profile, true) })
    .catch(function(err) { showError(document.getElementById('homeError'), err.message) })
})

// needsTap: the page was just loaded, so the browser won't allow sound until someone taps
function continueWithProfile(profile, needsTap) {
  if (profile) restoreProfile(profile)
  var setupDone = profile && profile.medicines.length > 0 && BoloBackend.hasPin()
  if (!setupDone) {
    showScreen('whoScreen')
  } else if (needsTap) {
    showScreen('patientHomeScreen')
    document.getElementById('startOverlay').style.display = 'flex'
  } else {
    openPatientMode()
  }
}

function restoreProfile(profile) {
  var patient = profile.patient
  patientName = patient.patientName || ''
  setupFor = patient.setupFor || 'self'
  selectedLanguage = patient.language || 'en'
  document.getElementById('nameInput').value = patientName
  document.getElementById('englishToggle').checked = patient.displayInEnglish !== false
  visionCheck.checked = !!patient.vision
  hearingCheck.checked = !!patient.hearing
  noneCheck.checked = !patient.vision && !patient.hearing
  document.querySelector('.app').classList.toggle('large-text', !!patient.vision)
  document.querySelectorAll('.lang-btn').forEach(function(btn) {
    btn.classList.toggle('selected', btn.getAttribute('data-lang') === selectedLanguage)
  })
  applyTranslations(selectedLanguage)

  medicines = profile.medicines.map(function(med) {
    med.scheduledAfter = new Date()
    return med
  })
  doseLog = profile.logs
}

document.getElementById('startOverlay').addEventListener('click', function() {
  openPatientMode()
})

document.getElementById('getStartedBtn').addEventListener('click', function() {
  showScreen(BoloBackend.isEnabled() ? 'authScreen' : 'whoScreen')
})

// ===== ACCOUNT (username + password) =====

var authMode = 'signup'

function setAuthMode(newMode) {
  authMode = newMode
  var signup = newMode === 'signup'
  document.getElementById('authTitle').textContent = signup ? 'Create an account' : 'Welcome back'
  document.getElementById('authSubmitBtn').textContent = signup ? 'Create account' : 'Log in'
  document.getElementById('authSwitchBtn').textContent = signup ? 'Already have an account? Log in' : 'New here? Create an account'
  document.getElementById('passwordInput').autocomplete = signup ? 'new-password' : 'current-password'
  document.getElementById('authError').style.display = 'none'
}

document.getElementById('authSwitchBtn').addEventListener('click', function() {
  setAuthMode(authMode === 'signup' ? 'login' : 'signup')
})

document.getElementById('authSubmitBtn').addEventListener('click', function() {
  var btn = this
  var username = document.getElementById('usernameInput').value.trim()
  var password = document.getElementById('passwordInput').value
  var authError = document.getElementById('authError')

  if (!/^[a-zA-Z0-9._-]{3,30}$/.test(username)) {
    showError(authError, 'Username must be 3 to 30 letters, numbers, dots, dashes or underscores')
    return
  }
  if (password.length < 6) {
    showError(authError, 'Password must be at least 6 characters')
    return
  }

  authError.style.display = 'none'
  btn.disabled = true
  var request = authMode === 'signup'
    ? BoloBackend.signUp(username, password)
    : BoloBackend.logIn(username, password)

  request
    .then(function() { return BoloBackend.loadProfile() })
    .then(function(profile) { continueWithProfile(profile, false) })
    .catch(function(err) { showError(authError, err.message) })
    .then(function() { btn.disabled = false })
})

// Eye button inside each password box: shows or hides what's typed
var EYE_ICON = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'
var EYE_OFF_ICON = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M3 3l18 18"/></svg>'

document.querySelectorAll('.show-password-btn').forEach(function(btn) {
  var input = document.getElementById(btn.getAttribute('aria-controls'))
  btn.innerHTML = EYE_ICON
  btn.addEventListener('click', function() {
    var showing = input.type === 'text'
    input.type = showing ? 'password' : 'text'
    btn.innerHTML = showing ? EYE_ICON : EYE_OFF_ICON
    btn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password')
    input.focus()
  })
})

;['usernameInput', 'passwordInput'].forEach(function(id) {
  document.getElementById(id).addEventListener('keydown', function(e) {
    if (e.key === 'Enter') document.getElementById('authSubmitBtn').click()
  })
})

// ===== SETUP: who, name, accessibility, language =====

document.getElementById('myselfBtn').addEventListener('click', function() {
  setupFor = 'self'
  document.getElementById('nameLabel').textContent = 'What is your name?'
  document.getElementById('nameInput').placeholder = 'Enter your name'
  showScreen('nameScreen')
})

document.getElementById('someoneBtn').addEventListener('click', function() {
  setupFor = 'someone'
  document.getElementById('nameLabel').textContent = 'What is your patient\'s name?'
  document.getElementById('nameInput').placeholder = 'Enter patient\'s name'
  showScreen('nameScreen')
})

document.getElementById('nameInput').addEventListener('input', function() {
  document.getElementById('nameError').style.display = 'none'
})

document.getElementById('nameNextBtn').addEventListener('click', function() {
  var nameValue = document.getElementById('nameInput').value.trim()
  if (nameValue === '') {
    document.getElementById('nameError').style.display = 'block'
    return
  }
  patientName = nameValue
  showScreen('accessibilityScreen')
})

var visionCheck = document.getElementById('visionCheck')
var hearingCheck = document.getElementById('hearingCheck')
var noneCheck = document.getElementById('noneCheck')

visionCheck.addEventListener('change', function() {
  if (visionCheck.checked || hearingCheck.checked) noneCheck.checked = false
})

hearingCheck.addEventListener('change', function() {
  if (visionCheck.checked || hearingCheck.checked) noneCheck.checked = false
})

noneCheck.addEventListener('change', function() {
  if (noneCheck.checked) {
    visionCheck.checked = false
    hearingCheck.checked = false
  }
})

document.getElementById('accessNextBtn').addEventListener('click', function() {
  document.querySelector('.app').classList.toggle('large-text', visionCheck.checked)
  showScreen('languageScreen')
})

document.querySelectorAll('.lang-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.lang-btn').forEach(function(b) {
      b.classList.remove('selected')
    })
    btn.classList.add('selected')
    document.getElementById('langError').style.display = 'none'
  })
})

document.getElementById('langNextBtn').addEventListener('click', function() {
  var selectedLangBtn = document.querySelector('.lang-btn.selected')
  if (!selectedLangBtn) {
    document.getElementById('langError').style.display = 'block'
    return
  }

  document.getElementById('langError').style.display = 'none'
  selectedLanguage = selectedLangBtn.getAttribute('data-lang')
  applyTranslations(selectedLanguage)

  BoloBackend.savePatient({
    patientName: patientName,
    setupFor: setupFor,
    language: selectedLanguage,
    displayInEnglish: document.getElementById('englishToggle').checked,
    vision: visionCheck.checked,
    hearing: hearingCheck.checked
  })
  openPinSetup(false)
})

document.getElementById('englishToggle').addEventListener('change', function() {
  applyTranslations(selectedLanguage)
})

// ===== SETUP: caregiver PIN =====

var resettingPin = false

function openPinSetup(isReset) {
  resettingPin = isReset
  document.getElementById('pinSetupLabel').textContent = isReset ? 'Set a new caregiver PIN' : 'Create a caregiver PIN'
  document.getElementById('pinInput').value = ''
  document.getElementById('pinConfirmInput').value = ''
  document.getElementById('pinSetupError').style.display = 'none'
  showScreen('pinSetupScreen')
}

;['pinInput', 'pinConfirmInput', 'pinEntryInput'].forEach(function(id) {
  document.getElementById(id).addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 4)
  })
})

document.getElementById('pinSaveBtn').addEventListener('click', function() {
  var btn = this
  var pin = document.getElementById('pinInput').value
  var pinConfirm = document.getElementById('pinConfirmInput').value
  var pinError = document.getElementById('pinSetupError')

  if (!/^\d{4}$/.test(pin)) {
    showError(pinError, 'The PIN must be exactly 4 digits')
    return
  }
  if (pin !== pinConfirm) {
    showError(pinError, 'The two PINs don\'t match')
    return
  }

  btn.disabled = true
  BoloBackend.setPin(pin)
    .then(function() {
      if (resettingPin) {
        resettingPin = false
        openDashboard()
      } else {
        resetMedicineForm()
        showScreen('medicineScreen')
      }
    })
    .catch(function(err) { showError(pinError, err.message) })
    .then(function() { btn.disabled = false })
})

// ===== SETUP: medicines =====

var addingFromDashboard = false

document.querySelectorAll('.day-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    btn.classList.toggle('selected')
    document.getElementById('medError').style.display = 'none'
  })
})

document.querySelectorAll('.freq-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.freq-btn').forEach(function(b) {
      b.classList.remove('selected')
    })
    btn.classList.add('selected')
  })
})

;['medNameInput', 'medDosageInput', 'medCountInput', 'medTimeInput'].forEach(function(id) {
  document.getElementById(id).addEventListener('input', function() {
    document.getElementById('medError').style.display = 'none'
  })
})

document.getElementById('medDosageInput').addEventListener('input', function() {
  if (this.value !== '' && Number(this.value) < 1) this.value = 1
  this.value = this.value.replace(/[^0-9]/g, '')
  if (this.value === '0') this.value = 1
})

document.getElementById('medCountInput').addEventListener('input', function() {
  if (this.value !== '' && Number(this.value) < 1) this.value = 1
  this.value = this.value.replace(/[^0-9]/g, '')
  if (this.value === '0') this.value = 1
})

function resetMedicineForm() {
  ;['medNameInput', 'medDosageInput', 'medCountInput', 'medTimeInput', 'medNotesInput'].forEach(function(id) {
    document.getElementById(id).value = ''
  })
  document.getElementById('medError').style.display = 'none'
  document.querySelectorAll('.day-btn.selected').forEach(function(btn) {
    btn.classList.remove('selected')
  })
  document.querySelectorAll('.freq-btn').forEach(function(btn) {
    btn.classList.toggle('selected', btn.getAttribute('data-freq') === 'weekly')
  })
  document.getElementById('medCancelBtn').style.display = addingFromDashboard ? 'block' : 'none'
}

document.getElementById('medNextBtn').addEventListener('click', function() {
  var medName = document.getElementById('medNameInput').value.trim()
  var medDosage = document.getElementById('medDosageInput').value.trim()
  var medCount = document.getElementById('medCountInput').value.trim()
  var medTime = document.getElementById('medTimeInput').value.trim()
  var selectedDays = document.querySelectorAll('.day-btn.selected')
  var medError = document.getElementById('medError')

  if (medName === '' || medDosage === '' || medCount === '' || medTime === '' || selectedDays.length === 0 || Number(medDosage) < 1 || Number(medCount) < 1) {
    showError(medError, getT().medErrorText)
    return
  }

  if (Number(medDosage) >= Number(medCount)) {
    showError(medError, 'Dosage must be less than your starting tablet count')
    return
  }

  var duplicate = medicines.some(function(m) {
    return m.name.toLowerCase() === medName.toLowerCase()
  })
  if (duplicate) {
    showError(medError, 'This medicine has already been added')
    return
  }

  medError.style.display = 'none'

  var daysArr = []
  selectedDays.forEach(function(btn) {
    daysArr.push(btn.getAttribute('data-day'))
  })

  var med = {
    name: medName,
    dosage: Number(medDosage),
    count: Number(medCount),
    startCount: Number(medCount),
    time: medTime,
    days: daysArr,
    frequency: document.querySelector('.freq-btn.selected').getAttribute('data-freq'),
    notes: document.getElementById('medNotesInput').value.trim(),
    startDate: new Date().toISOString(),
    scheduledAfter: new Date() // only remind for doses after it was added
  }
  med.endDate = estimateEndDate(med)

  medicines.push(med)
  BoloBackend.saveMedicine(med)
  showScreen('medicineAddedScreen')
})

document.getElementById('addAnotherBtn').addEventListener('click', function() {
  resetMedicineForm()
  showScreen('medicineScreen')
})

document.getElementById('doneAddingBtn').addEventListener('click', function() {
  if (addingFromDashboard) {
    addingFromDashboard = false
    openDashboard()
  } else {
    openPatientMode()
  }
})

document.getElementById('medCancelBtn').addEventListener('click', function() {
  addingFromDashboard = false
  openDashboard()
})

// ===== SCHEDULING =====

var DAY_MS = 24 * 60 * 60 * 1000
var dayIndexMap = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 0 }
var WEEKS_BETWEEN = { weekly: 1, biweekly: 2, monthly: 4 } // "every month" = every 4 weeks

function startOfDay(date) {
  var d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

// For "every 2 weeks" / "every month": only weeks counted from the week the medicine was added
function isScheduledWeek(med, date) {
  var weeksBetween = WEEKS_BETWEEN[med.frequency] || 1
  if (weeksBetween === 1) return true
  var startMonday = startOfDay(med.startDate)
  startMonday.setDate(startMonday.getDate() - ((startMonday.getDay() + 6) % 7))
  var daysSince = Math.round((startOfDay(date) - startMonday) / DAY_MS)
  return Math.floor(daysSince / 7) % weeksBetween === 0
}

// The first dose time strictly after `after`, or null
function getNextDoseDate(med, after) {
  var parts = med.time.split(':')
  var dayNums = med.days.map(function(d) { return dayIndexMap[d] })
  var searchDays = 7 * (WEEKS_BETWEEN[med.frequency] || 1) + 1

  for (var i = 0; i <= searchDays; i++) {
    var candidate = startOfDay(after)
    candidate.setDate(candidate.getDate() + i)
    candidate.setHours(parseInt(parts[0], 10), parseInt(parts[1], 10), 0, 0)
    if (candidate > after && dayNums.indexOf(candidate.getDay()) !== -1 && isScheduledWeek(med, candidate)) {
      return candidate
    }
  }
  return null
}

// Date of the last dose the remaining tablets cover, as an ISO string ('' if already out)
function estimateEndDate(med) {
  var dosesLeft = Math.floor(med.count / med.dosage)
  var date = med.scheduledAfter || new Date()
  for (var i = 0; i < dosesLeft; i++) {
    date = getNextDoseDate(med, date)
    if (!date) return ''
  }
  return dosesLeft > 0 ? date.toISOString() : ''
}

function pickNextDose() {
  var best = null
  medicines.forEach(function(med) {
    var date = getNextDoseDate(med, med.scheduledAfter || new Date())
    if (date && (!best || date < best.date)) best = { med: med, date: date }
  })
  return best
}

// ===== FORMATTING =====

var FREQ_LABELS = { weekly: 'Every week', biweekly: 'Every 2 weeks', monthly: 'Every month' }

function isToday(date) {
  return startOfDay(date).getTime() === startOfDay(new Date()).getTime()
}

function formatTimeOf(date) {
  return new Date(date).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function formatDoseTime(date) {
  var time = formatTimeOf(date)
  return isToday(date) ? time : date.toLocaleDateString([], { weekday: 'short' }) + ' ' + time
}

function formatDate(date) {
  return new Date(date).toLocaleDateString([], { month: 'short', day: 'numeric' })
}

function formatDateTime(date) {
  return formatDate(date) + ', ' + formatTimeOf(date)
}

function formatClock(timeStr) {
  var parts = timeStr.split(':')
  var d = new Date()
  d.setHours(parseInt(parts[0], 10), parseInt(parts[1], 10), 0, 0)
  return formatTimeOf(d)
}

function formatDays(days) {
  return Object.keys(dayIndexMap)
    .filter(function(d) { return days.indexOf(d) !== -1 })
    .map(function(d) { return translations.en.days[d] })
    .join(', ')
}

function sentence(text) {
  return text.trim().replace(/[.。!！]+$/, '') + '.'
}

// ===== VOICE: speaking =====

var voices = []
var currentUtterance = null // kept so Chrome doesn't garbage-collect it mid-sentence

function loadVoices() {
  voices = window.speechSynthesis.getVoices()
}

if ('speechSynthesis' in window) {
  loadVoices()
  window.speechSynthesis.onvoiceschanged = loadVoices
}

// Prefer natural-sounding voices; the browser default is often robotic or the wrong accent
function pickVoice(langTag) {
  var base = langTag.split('-')[0]
  var matches = voices.filter(function(v) {
    return v.lang.replace('_', '-').split('-')[0].toLowerCase() === base
  })
  var isNatural = function(v) { return /natural|neural|enhanced|premium|google/i.test(v.name) }
  var isExact = function(v) { return v.lang.replace('_', '-') === langTag }
  return matches.find(function(v) { return isNatural(v) && isExact(v) }) ||
    matches.find(isNatural) || matches.find(isExact) || matches[0] || null
}

function speak(text, onDone) {
  var finished = false
  function done() {
    if (finished) return
    finished = true
    if (onDone) onDone()
  }
  if (!('speechSynthesis' in window)) { done(); return }

  window.speechSynthesis.cancel()
  var lang = speechLangMap[selectedLanguage] || 'en-US'
  var utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  var voice = pickVoice(lang)
  if (voice) utterance.voice = voice
  utterance.rate = 0.85
  utterance.pitch = 1.05
  utterance.onend = done
  utterance.onerror = done
  currentUtterance = utterance
  window.speechSynthesis.speak(utterance)
  setTimeout(done, 30000) // some browsers never fire onend
}

// Always the patient's language, even when the screen is shown in English
function reminderSpeech(med) {
  var t = translations[selectedLanguage] || translations.en
  var phrases = voicePhrases[selectedLanguage] || voicePhrases.en
  var parts = []
  if (patientName) parts.push(patientName + ',')
  parts.push(t.speechPrefix + med.name + '.')
  parts.push(med.dosage + ' ' + phrases.tablets + '.')
  if (med.notes) parts.push(sentence(med.notes))
  parts.push(phrases.askConfirm)
  return parts.join(' ')
}

function doseDetailsSpeech(dose) {
  var phrases = voicePhrases[selectedLanguage] || voicePhrases.en
  var lang = speechLangMap[selectedLanguage] || 'en-US'
  var when = dose.date.toLocaleTimeString(lang, { hour: 'numeric', minute: '2-digit' })
  if (!isToday(dose.date)) when = dose.date.toLocaleDateString(lang, { weekday: 'long' }) + ', ' + when
  var parts = [phrases.nextMedicine + ' ' + dose.med.name + ', ' + when + '.', dose.med.dosage + ' ' + phrases.tablets + '.']
  if (dose.med.notes) parts.push(sentence(dose.med.notes))
  return parts.join(' ')
}

function speakConfirmation() {
  speak(confirmationPhrases[selectedLanguage] || confirmationPhrases.en)
}

var audioContext = null

function getAudioContext() {
  if (!audioContext) {
    var AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return null
    audioContext = new AudioCtx()
  }
  if (audioContext.state === 'suspended') audioContext.resume()
  return audioContext
}

function playChime() {
  var ctx = getAudioContext()
  if (!ctx) return 0
  var notes = [523, 659, 784]
  notes.forEach(function(freq, i) {
    var osc = ctx.createOscillator()
    var gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = freq
    osc.type = 'sine'
    var startTime = ctx.currentTime + (i * 0.35)
    gain.gain.setValueAtTime(0, startTime)
    gain.gain.linearRampToValueAtTime(0.25, startTime + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.9)
    osc.start(startTime)
    osc.stop(startTime + 0.9)
  })
  return (notes.length * 0.35) + 0.9
}

// Browsers only allow sound and the mic after a tap, so this runs on every tap that opens patient mode
var micChecked = false

function unlockAudio() {
  getAudioContext()
  if ('speechSynthesis' in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(''))
  if (micChecked || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return
  micChecked = true
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
      stream.getTracks().forEach(function(track) { track.stop() })
    })
    .catch(function() { voiceUnavailable = true })
}

// ===== VOICE: listening =====

var recognition = null
var wantListening = false
var voiceUnavailable = false // mic denied or missing; tap still works
var NO_SPACE_LANGUAGES = ['zh', 'ja']

// Whole-word match so "yes" doesn't match inside "yesterday"
function heardAnyOf(transcript, words) {
  var text = transcript.toLowerCase().replace(/’/g, '\'')
  if (NO_SPACE_LANGUAGES.indexOf(selectedLanguage) !== -1) {
    return words.some(function(word) { return text.indexOf(word) !== -1 })
  }
  var padded = ' ' + text.replace(/[.,!?¡¿،؟;:"“”«»]/g, ' ').replace(/\s+/g, ' ').trim() + ' '
  return words.some(function(word) {
    return padded.indexOf(' ' + word.toLowerCase() + ' ') !== -1
  })
}

function isConfirmation(transcript) {
  var confirmWords = voiceConfirmWords[selectedLanguage] || voiceConfirmWords.en
  var negativeWords = voiceNegativeWords[selectedLanguage] || voiceNegativeWords.en
  return !heardAnyOf(transcript, negativeWords) && heardAnyOf(transcript, confirmWords)
}

function startVoiceListening() {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SpeechRecognition || voiceUnavailable) return
  wantListening = true
  if (recognition) return

  recognition = new SpeechRecognition()
  recognition.lang = speechLangMap[selectedLanguage] || 'en-US'
  recognition.continuous = false
  recognition.interimResults = false

  recognition.onresult = function(event) {
    if (isConfirmation(event.results[0][0].transcript)) confirmDose('voice')
  }

  recognition.onerror = function(event) {
    // Permission problems won't fix themselves, so stop retrying
    if (event.error === 'not-allowed' || event.error === 'service-not-allowed' || event.error === 'audio-capture') {
      voiceUnavailable = true
      wantListening = false
    }
  }

  // Recognition stops after each phrase or silence; restart while a reminder is waiting
  recognition.onend = function() {
    recognition = null
    setTimeout(function() {
      if (wantListening) startVoiceListening()
    }, 300)
  }

  try {
    recognition.start()
  } catch (e) {
    recognition = null
  }
}

function stopVoiceListening() {
  wantListening = false
  if (recognition) recognition.abort()
}

// ===== PATIENT MODE: countdown =====

var countdownInterval = null
var nextDose = null   // { med, date } shown on the countdown
var activeDose = null // the reminder currently waiting for confirmation

function showPatientState(state) {
  document.getElementById('countdownState').style.display = state === 'countdown' ? 'flex' : 'none'
  document.getElementById('dueState').style.display = state === 'due' ? 'flex' : 'none'
}

function openPatientMode() {
  mode = 'patient'
  unlockAudio()
  document.getElementById('startOverlay').style.display = 'none'
  showScreen('patientHomeScreen')
  if (activeDose) {
    showDueState()
    announceReminder()
  } else {
    startCountdown()
  }
}

function pausePatientMode() {
  clearInterval(countdownInterval)
  clearTimeout(holdTimer)
  stopVoiceListening()
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  if (activeDose) clearTimeout(activeDose.repeatTimer)
}

function startCountdown() {
  clearInterval(countdownInterval)
  nextDose = pickNextDose()
  showPatientState('countdown')

  document.getElementById('nextMedName').textContent = nextDose ? nextDose.med.name : 'No medicines scheduled'
  document.getElementById('nextMedTime').textContent = nextDose ? formatDoseTime(nextDose.date) : ''
  if (!nextDose) {
    updateCountdownDisplay(0)
    return
  }

  countdownInterval = setInterval(tickCountdown, 1000)
  tickCountdown()
}

function tickCountdown() {
  var diff = nextDose.date - new Date()
  if (diff <= 0) {
    clearInterval(countdownInterval)
    fireReminder(nextDose)
    return
  }
  updateCountdownDisplay(diff)
}

// Rounds up to the minute so it never shows "0 mins" before the reminder has fired
function updateCountdownDisplay(ms) {
  var totalMinutes = Math.max(0, Math.ceil(ms / 60000))
  document.getElementById('countdownDays').textContent = Math.floor(totalMinutes / 1440)
  document.getElementById('countdownHours').textContent = Math.floor((totalMinutes % 1440) / 60)
  document.getElementById('countdownMins').textContent = totalMinutes % 60
}

function showCheckOverlay() {
  if (!nextDose) return
  var med = nextDose.med
  var overlay = document.getElementById('checkOverlay')

  document.getElementById('checkMedName').textContent = med.name
  document.getElementById('checkMedDosage').textContent = med.dosage + ' tablet(s)'
  document.getElementById('checkNextTime').textContent = 'Next: ' + formatDoseTime(nextDose.date)

  var notesEl = document.getElementById('checkMedNotes')
  notesEl.textContent = med.notes
  notesEl.style.display = med.notes ? 'block' : 'none'

  overlay.style.display = 'flex'
  speak(doseDetailsSpeech(nextDose))

  var dismissTimer = setTimeout(function() {
    overlay.style.display = 'none'
  }, 6000)

  overlay.onclick = function() {
    clearTimeout(dismissTimer)
    overlay.style.display = 'none'
  }
}

document.getElementById('countdownMedCard').addEventListener('click', function() {
  showCheckOverlay()
})

// ===== PATIENT MODE: reminder =====

var REPEAT_AFTER_MS = 5 * 60 * 1000
var MAX_ANNOUNCEMENTS = 3 // at 0, 5 and 10 minutes; marked missed at 15

function fireReminder(dose) {
  activeDose = {
    med: dose.med,
    scheduledFor: dose.date,
    remindedAt: new Date(),
    announcements: 0,
    repeatTimer: null
  }
  showDueState()
  announceReminder()
}

function showDueState() {
  var med = activeDose.med
  showPatientState('due')
  document.getElementById('dueMedName').textContent = med.name
  document.getElementById('dueMedDosage').textContent = med.dosage + ' tablet(s)'

  var notesEl = document.getElementById('nextMedNotes')
  notesEl.textContent = med.notes
  notesEl.style.display = med.notes ? 'block' : 'none'

  holdZone.classList.remove('holding', 'confirmed')
  document.getElementById('holdLabel').textContent = getT().holdToConfirm
}

// False once the dose is confirmed/missed or the caregiver has opened the dashboard
function isStillWaiting(dose) {
  return mode === 'patient' && dose === activeDose
}

function announceReminder() {
  var dose = activeDose
  dose.announcements++
  stopVoiceListening() // so the mic doesn't hear the app talking

  if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200])
  var chimeSeconds = playChime()

  setTimeout(function() {
    if (!isStillWaiting(dose)) return
    speak(reminderSpeech(dose.med), function() {
      if (isStillWaiting(dose)) startVoiceListening()
    })
  }, (chimeSeconds * 1000) + 300)

  dose.repeatTimer = setTimeout(function() {
    if (!isStillWaiting(dose)) return
    if (dose.announcements < MAX_ANNOUNCEMENTS) {
      announceReminder()
    } else {
      finishDose('missed', '')
      startCountdown()
    }
  }, REPEAT_AFTER_MS)
}

// Records the dose as taken or missed and moves that medicine's schedule forward
function finishDose(status, method) {
  var dose = activeDose
  activeDose = null
  clearTimeout(dose.repeatTimer)
  stopVoiceListening()

  var med = dose.med
  if (status === 'confirmed') med.count = Math.max(0, med.count - med.dosage)
  med.scheduledAfter = dose.scheduledFor
  med.endDate = estimateEndDate(med)

  var entry = {
    medicineName: med.name,
    dosage: med.dosage,
    scheduledFor: dose.scheduledFor,
    remindedAt: dose.remindedAt,
    confirmedAt: status === 'confirmed' ? new Date() : null,
    status: status,
    method: method,
    tabletsLeft: med.count
  }
  doseLog.unshift(entry)
  BoloBackend.logDose(entry)
  BoloBackend.updateMedicine(med)
}

function confirmDose(method) {
  if (!activeDose || mode !== 'patient') return
  finishDose('confirmed', method)

  holdZone.classList.remove('holding')
  holdZone.classList.add('confirmed')
  document.getElementById('holdLabel').textContent = getT().confirmedText
  if (navigator.vibrate) navigator.vibrate([100, 50, 100])
  speakConfirmation()

  setTimeout(function() {
    holdZone.classList.remove('confirmed')
    if (mode === 'patient' && !activeDose) startCountdown()
  }, 3000)
}

// ===== HOLD ZONE =====

var holdTimer = null
var holdZone = document.getElementById('holdZone')
var HOLD_DURATION = 3000

holdZone.addEventListener('pointerdown', function() {
  if (!activeDose) return
  holdZone.style.setProperty('--fill-duration', HOLD_DURATION + 'ms')
  holdZone.classList.add('holding')
  document.getElementById('holdLabel').textContent = getT().keepHolding
  if (navigator.vibrate) navigator.vibrate(50)

  holdTimer = setTimeout(function() {
    confirmDose('tap')
  }, HOLD_DURATION)
})

function cancelHold() {
  clearTimeout(holdTimer)
  if (activeDose) {
    holdZone.classList.remove('holding')
    document.getElementById('holdLabel').textContent = getT().holdToConfirm
  }
}

holdZone.addEventListener('pointerup', cancelHold)
holdZone.addEventListener('pointercancel', cancelHold)

// ===== CAREGIVER LOCK =====

var PIN_MAX_TRIES = 5
var PIN_LOCKOUT_MS = 60 * 1000
var pinTries = 0
var pinLockedUntil = 0

function openPinOverlay() {
  document.getElementById('pinEntryInput').value = ''
  document.getElementById('pinPasswordInput').value = ''
  document.getElementById('pinEntryError').style.display = 'none'
  document.getElementById('pinPasswordSection').style.display = 'none'
  document.getElementById('forgotPinBtn').style.display = BoloBackend.isEnabled() ? 'block' : 'none'
  document.getElementById('pinOverlay').style.display = 'flex'
  document.getElementById('pinEntryInput').focus()
}

function closePinOverlay() {
  document.getElementById('pinOverlay').style.display = 'none'
}

document.getElementById('caregiverLockBtn').addEventListener('click', openPinOverlay)
document.getElementById('pinCancelBtn').addEventListener('click', closePinOverlay)

document.getElementById('pinUnlockBtn').addEventListener('click', function() {
  var pinInput = document.getElementById('pinEntryInput')
  var pinError = document.getElementById('pinEntryError')
  var secondsLeft = Math.ceil((pinLockedUntil - Date.now()) / 1000)

  if (secondsLeft > 0) {
    showError(pinError, 'Too many wrong tries. Try again in ' + secondsLeft + ' seconds')
    return
  }

  BoloBackend.checkPin(pinInput.value).then(function(correct) {
    if (correct) {
      pinTries = 0
      closePinOverlay()
      openDashboard()
      return
    }
    pinTries++
    pinInput.value = ''
    if (pinTries >= PIN_MAX_TRIES) {
      pinTries = 0
      pinLockedUntil = Date.now() + PIN_LOCKOUT_MS
      showError(pinError, 'Too many wrong tries. Try again in ' + (PIN_LOCKOUT_MS / 1000) + ' seconds')
    } else {
      showError(pinError, 'Wrong PIN')
    }
  })
})

document.getElementById('pinEntryInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') document.getElementById('pinUnlockBtn').click()
})

document.getElementById('forgotPinBtn').addEventListener('click', function() {
  document.getElementById('pinPasswordSection').style.display = 'block'
  document.getElementById('pinPasswordInput').focus()
})

// The account password works as a master key to set a new PIN
document.getElementById('pinPasswordBtn').addEventListener('click', function() {
  var btn = this
  btn.disabled = true
  BoloBackend.verifyPassword(document.getElementById('pinPasswordInput').value)
    .then(function() {
      closePinOverlay()
      mode = 'caregiver'
      pausePatientMode()
      openPinSetup(true)
    })
    .catch(function(err) { showError(document.getElementById('pinEntryError'), err.message) })
    .then(function() { btn.disabled = false })
})

// ===== CAREGIVER DASHBOARD =====

var LOW_SUPPLY_DAYS = 7
var MISSED_ALERT_DAYS = 2

function openDashboard() {
  mode = 'caregiver'
  pausePatientMode()
  renderDashboard()
  showScreen('caregiverScreen')
}

function el(tag, className, text) {
  var node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

function renderDashboard() {
  document.getElementById('dashPatientName').textContent = patientName
  renderAlerts()
  renderMedicineCards()
  renderDoseLog()
}

function renderAlerts() {
  var box = document.getElementById('dashAlerts')
  box.innerHTML = ''
  var alerts = []

  if (activeDose) {
    alerts.push({ level: 'warn', text: activeDose.med.name + ' reminder is waiting to be confirmed' })
  }

  medicines.forEach(function(med) {
    if (med.count < med.dosage) {
      alerts.push({ level: 'danger', text: med.name + ' is out of tablets' })
    } else if (med.endDate && new Date(med.endDate) - Date.now() < LOW_SUPPLY_DAYS * DAY_MS) {
      alerts.push({ level: 'warn', text: med.name + ' runs out on ' + formatDate(med.endDate) + ' (' + med.count + ' tablets left)' })
    }
  })

  var missedSince = Date.now() - MISSED_ALERT_DAYS * DAY_MS
  doseLog.forEach(function(entry) {
    if (entry.status === 'missed' && entry.scheduledFor.getTime() >= missedSince) {
      alerts.push({ level: 'danger', text: 'Missed ' + entry.medicineName + ' on ' + formatDateTime(entry.scheduledFor) })
    }
  })

  if (alerts.length === 0) box.appendChild(el('p', 'dash-alert ok', 'All good, no alerts'))
  alerts.forEach(function(alert) {
    box.appendChild(el('p', 'dash-alert ' + alert.level, alert.text))
  })
}

function statBlock(value, label) {
  var block = el('div', 'dash-stat')
  block.appendChild(el('p', 'dash-stat-value', String(value)))
  block.appendChild(el('p', 'dash-stat-label', label))
  return block
}

function renderMedicineCards() {
  var list = document.getElementById('dashMedicines')
  list.innerHTML = ''
  if (medicines.length === 0) list.appendChild(el('p', 'dash-empty', 'No medicines yet'))

  medicines.forEach(function(med) {
    var card = el('div', 'dash-card')
    card.appendChild(el('p', 'dash-med-name', med.name))
    card.appendChild(el('p', 'dash-med-detail',
      med.dosage + ' tablet(s) at ' + formatClock(med.time) + ' · ' + formatDays(med.days) + ' · ' + FREQ_LABELS[med.frequency]))

    var stats = el('div', 'dash-stats')
    stats.appendChild(statBlock(med.count, 'tablets left'))
    stats.appendChild(statBlock(Math.floor(med.count / med.dosage), 'doses left'))
    stats.appendChild(statBlock(med.endDate ? formatDate(med.endDate) : 'Out', 'runs out'))
    card.appendChild(stats)

    if (med.notes) card.appendChild(el('p', 'dash-med-notes', med.notes))

    var actions = el('div', 'dash-actions')
    var refillInput = el('input', 'dash-refill-input')
    refillInput.type = 'number'
    refillInput.min = '1'
    refillInput.placeholder = 'Tablets'
    var refillBtn = el('button', 'dash-btn', 'Refill')
    var removeBtn = el('button', 'dash-btn danger', 'Remove')

    refillBtn.addEventListener('click', function() {
      var added = parseInt(refillInput.value, 10)
      if (!(added >= 1)) {
        refillInput.focus()
        return
      }
      med.count += added
      med.endDate = estimateEndDate(med)
      BoloBackend.updateMedicine(med)
      renderDashboard()
    })

    removeBtn.addEventListener('click', function() {
      if (!confirm('Remove ' + med.name + '? Reminders for it will stop.')) return
      medicines.splice(medicines.indexOf(med), 1)
      if (activeDose && activeDose.med === med) activeDose = null
      BoloBackend.deleteMedicine(med)
      renderDashboard()
    })

    actions.appendChild(refillInput)
    actions.appendChild(refillBtn)
    actions.appendChild(removeBtn)
    card.appendChild(actions)
    list.appendChild(card)
  })
}

function renderDoseLog() {
  var list = document.getElementById('dashLog')
  list.innerHTML = ''
  if (doseLog.length === 0) list.appendChild(el('p', 'dash-empty', 'No reminders yet'))

  doseLog.slice(0, 30).forEach(function(entry) {
    var taken = entry.status === 'confirmed'
    var statusText = taken
      ? '✓ Taken ' + formatTimeOf(entry.confirmedAt) + (entry.method ? ' (' + entry.method + ')' : '')
      : '✗ Missed'
    var row = el('div', 'dash-log-row')
    row.appendChild(el('span', 'dash-log-med', entry.medicineName))
    row.appendChild(el('span', 'dash-log-time', formatDateTime(entry.scheduledFor)))
    row.appendChild(el('span', 'dash-log-status ' + entry.status, statusText))
    list.appendChild(row)
  })
}

document.getElementById('dashAddMedBtn').addEventListener('click', function() {
  addingFromDashboard = true
  resetMedicineForm()
  showScreen('medicineScreen')
})

document.getElementById('lockDashboardBtn').addEventListener('click', function() {
  openPatientMode()
})

document.getElementById('signOutBtn').addEventListener('click', function() {
  if (confirm('Sign out? The patient will stop getting reminders on this device.')) BoloBackend.logOut()
})
