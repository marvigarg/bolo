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