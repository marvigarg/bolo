document.getElementById('getStartedBtn').addEventListener('click', function() {
  document.getElementById('homeScreen').style.display = 'none'
  document.getElementById('whoScreen').style.display = 'flex'
})

document.getElementById('myselfBtn').addEventListener('click', function() {
  document.getElementById('whoScreen').style.display = 'none'
  document.getElementById('nameLabel').textContent = 'What is your name?'
  document.getElementById('nameInput').placeholder = 'Enter your name'
  document.getElementById('nameScreen').style.display = 'flex'
})

document.getElementById('someoneBtn').addEventListener('click', function() {
  document.getElementById('whoScreen').style.display = 'none'
  document.getElementById('nameLabel').textContent = 'What is your patient\'s name?'
  document.getElementById('nameInput').placeholder = 'Enter patient\'s name'
  document.getElementById('nameScreen').style.display = 'flex'
})

document.getElementById('nameInput').addEventListener('input', function() {
  document.getElementById('nameError').style.display = 'none'
})

document.getElementById('nameNextBtn').addEventListener('click', function() {
  var nameValue = document.getElementById('nameInput').value.trim()
  var nameError = document.getElementById('nameError')

  if (nameValue === '') {
    nameError.style.display = 'block'
    return
  }

  nameError.style.display = 'none'
  document.getElementById('nameScreen').style.display = 'none'
  document.getElementById('languageScreen').style.display = 'flex'
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
  var selectedLang = document.querySelector('.lang-btn.selected')
  var langError = document.getElementById('langError')

  if (!selectedLang) {
    langError.style.display = 'block'
    return
  }

  langError.style.display = 'none'
  document.getElementById('languageScreen').style.display = 'none'
  document.getElementById('medicineScreen').style.display = 'flex'
})

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

document.getElementById('medNextBtn').addEventListener('click', function() {
  var medName = document.getElementById('medNameInput').value.trim()
  var medDosage = document.getElementById('medDosageInput').value.trim()
  var medCount = document.getElementById('medCountInput').value.trim()
  var medTime = document.getElementById('medTimeInput').value.trim()
  var selectedDays = document.querySelectorAll('.day-btn.selected')
  var medError = document.getElementById('medError')

  if (medName === '' || medDosage === '' || medCount === '' || medTime === '' || selectedDays.length === 0) {
    medError.style.display = 'block'
    return
  }

  medError.style.display = 'none'
  document.getElementById('medicineScreen').style.display = 'none'
  document.getElementById('patientHomeScreen').style.display = 'flex'

  var medNotes = document.getElementById('medNotesInput').value

  document.getElementById('nextMedName').textContent = medName
  document.getElementById('nextMedTime').textContent = 'Today at ' + medTime

  var notesEl = document.getElementById('nextMedNotes')
  if (medNotes.trim() !== '') {
    notesEl.textContent = medNotes
    notesEl.style.display = 'block'
  } else {
    notesEl.style.display = 'none'
  }

  var speechText = 'Time to take ' + medName
  if (medNotes.trim() !== '') {
    speechText += '. ' + medNotes
  }
  var speech = new SpeechSynthesisUtterance(speechText)
  window.speechSynthesis.speak(speech)
})

var holdTimer = null
var holdZone = document.getElementById('holdZone')
var HOLD_DURATION = 3000 // ms — how long to hold; fill animation matches this exactly

holdZone.addEventListener('pointerdown', function() {
  holdZone.style.setProperty('--fill-duration', HOLD_DURATION + 'ms')
  holdZone.classList.add('holding')
  document.getElementById('holdLabel').textContent = 'Keep holding...'
  if (navigator.vibrate) navigator.vibrate(50)

  holdTimer = setTimeout(function() {
    document.getElementById('holdLabel').textContent = 'Confirmed!'
    if (navigator.vibrate) navigator.vibrate([100, 50, 100])
  }, HOLD_DURATION)
})

holdZone.addEventListener('pointerup', function() {
  clearTimeout(holdTimer)
  holdZone.classList.remove('holding')
  if (document.getElementById('holdLabel').textContent !== 'Confirmed!') {
    document.getElementById('holdLabel').textContent = 'Hold to confirm'
  }
})

holdZone.addEventListener('pointercancel', function() {
  clearTimeout(holdTimer)
  holdZone.classList.remove('holding')
  document.getElementById('holdLabel').textContent = 'Hold to confirm'
})