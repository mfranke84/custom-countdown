const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker'); 
const countdownTitleEl = document.getElementById('countdown-title');
const countdownEl = document.getElementById('countdown');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const titleEl = document.getElementById('title');
const completeEl = document.getElementById('complete');
const completeBtn = document.getElementById('complete-button');
const completeInfo = document.getElementById('complete-info');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

// Populate countdown / Complete UI
function updateDOM(){
    countdownActive = setInterval(()=>{
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day)/hour);
        const minutes = Math.floor((distance % hour)/minute);
        const seconds = Math.floor((distance % minute)/second);

        // Hide input
        inputContainer.hidden = true;

        // If the countdown has ended, show complete
        if(distance < 0){
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false; 
        } else{
            // Else, show countdown in progress
            countdownTitleEl.textContent = `${countdownTitle}`;
            timeElements[0].textContent = days;
            timeElements[1].textContent = hours;
            timeElements[2].textContent = minutes;
            timeElements[3].textContent = seconds;
            completeEl.hidden = true;
            countdownEl.hidden = false; 
        }
    },second);
        

}

// Take values from form input
function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown ={
        title: countdownTitle,
        date: countdownDate
    };
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));
    // Check for valid date
    if (countdownDate === ''){
        alert('Please seletc a valid date for the countdown!');
    } else{
        // Get number version of current date
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Reset all values
function reset(){
    // Hide countdown, show Input 
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false; 

    // Stop countdown
    clearInterval(countdownActive);
    // Reset values
    titleEl.value = '';
    dateEl.value = '';
    localStorage.removeItem('countdown');

}

// Restore from local storage
function restorePreviousCountdown(){
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event listener
countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click',reset);

// On load, check localStorage
restorePreviousCountdown();