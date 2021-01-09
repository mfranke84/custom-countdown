const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker'); 
const countdown = document.getElementById('countdown');

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
console.log(today);
dateEl.setAttribute('min',today);