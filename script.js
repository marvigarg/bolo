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

document.getElementById('nameNextBtn').addEventListener('click', function() {
  document.getElementById('nameScreen').style.display = 'none'
  document.getElementById('languageScreen').style.display = 'flex'
})

document.querySelectorAll('.lang-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.lang-btn').forEach(function(b) {
      b.classList.remove('selected')
    })
    btn.classList.add('selected')
  })
})

document.getElementById('langNextBtn').addEventListener('click', function() {
  document.getElementById('languageScreen').style.display = 'none'
  document.getElementById('medicineScreen').style.display = 'flex'
})

document.querySelectorAll('.day-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    btn.classList.toggle('selected')
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

document.getElementById('medNextBtn').addEventListener('click', function() {
  document.getElementById('medicineScreen').style.display = 'none'
  document.getElementById('patientHomeScreen').style.display = 'flex'

  var medName = document.getElementById('medNameInput').value
  var medTime = document.getElementById('medTimeInput').value
  document.getElementById('nextMedName').textContent = medName
  document.getElementById('nextMedTime').textContent = 'Today at ' + medTime

  var speech = new SpeechSynthesisUtterance('Time to take ' + medName)
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
