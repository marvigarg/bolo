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