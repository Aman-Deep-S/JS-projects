const timerLabel = document.getElementById("timer-label");
const timeDisplay = document.getElementById("time");
const sessionLength = document.getElementById("session-length");
const breakLength = document.getElementById("break-length");
const sessionIncrement = document.getElementById("session-increment");
const sessionDecrement = document.getElementById("session-decrement");
const breakIncrement = document.getElementById("break-increment");
const breakDecrement = document.getElementById("break-decrement");

const startpauseButton = document.getElementById("start-pause");
const resetButton = document.getElementById("reset");

let sessionTime = 15;
let breakTime = 5;
let isSession = true;
let isRunning = false;
let timerInterval;
let interval;
let minutes = sessionTime;
let seconds = 0;
hiddenfalse();
// disableButtonfalse();

function hiddenfalse() {
    sessionIncrement.hidden = false;
    sessionDecrement.hidden = false;
    breakIncrement.hidden = false;
    breakDecrement.hidden = false;
}
function hiddentrue() {
    sessionIncrement.hidden = true;
    sessionDecrement.hidden = true;
    breakIncrement.hidden = true;
    breakDecrement.hidden = true;
}
// const disableButtontrue = () => {
//     sessionIncrement.disabled = true;
//     sessionDecrement.disabled = true;
//     breakIncrement.disabled = true;
//     breakDecrement.disabled = true;
// };
// const disableButtonfalse = () => {
//     sessionIncrement.disabled = false;
//     sessionDecrement.disabled = false;
//     breakIncrement.disabled = false;
//     breakDecrement.disabled = false;
// };


startpauseButton.addEventListener('click', startpause);
resetButton.addEventListener('click', reset);
sessionIncrement.addEventListener("click", incrementSession);
sessionDecrement.addEventListener("click", decrementSession);
breakIncrement.addEventListener("click", incrementBreak);
breakDecrement.addEventListener("click", decrementBreak);

function startpause() {
    if (!isRunning) {
        start();
    } else {
        pause();
    }
}

function start() {
    interval = setInterval(updateTime, 1000);
    startpauseButton.textContent = 'Pause';
    isRunning = true;
    hiddentrue();
    // disableButtontrue();
}

function updateTime() {
    if (minutes === 0 && seconds === 0) {
        if (isSession) {
            isSession = false;
            timerLabel.textContent = "Break";
            minutes = breakTime;
        } else {
            isSession = true;
            timerLabel.textContent = "Session";
            minutes = sessionTime;
        }
    } else if (seconds === 0) {
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    updateDisplay();
}


function updateDisplay() {
    timeDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function pause() {
    clearInterval(interval);
    isRunning = false;
    startpauseButton.textContent = 'Start';
    hiddenfalse();
    // disableButtonfalse();
}


function reset() {
    clearInterval(interval);
    isRunning = false;
    isSession = true;
    sessionTime = 15
    breakTime = 5;
    minutes = sessionTime;
    seconds = 0;
    timerLabel.textContent = "Session";
    startpauseButton.textContent = 'Start';
    hiddenfalse();
    // disableButtonfalse();
    updateDisplay();
}


function incrementSession() {
    if (!isRunning && sessionTime < 60) {
        sessionTime++;
        if (isSession) minutes = sessionTime;
        sessionLength.textContent = sessionTime;
        updateDisplay();
    }
}

function decrementSession() {
    if (!isRunning && sessionTime > 1) {
        sessionTime--;
        if (isSession) minutes = sessionTime;
        sessionLength.textContent = sessionTime;
        updateDisplay();
    }
}

function incrementBreak() {
    if (!isRunning && breakTime < 60) {
        breakTime++;
        if (!isSession) minutes = breakTime;
        breakLength.textContent = breakTime;
        updateDisplay();
    }
}

function decrementBreak() {
    if (!isRunning && breakTime > 1) {
        breakTime--;
        if (!isSession) minutes = breakTime;
        breakLength.textContent = breakTime;
        updateDisplay();
    }
}



updateDisplay();
