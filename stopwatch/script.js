let isRunning = false;
let lapCounter = 1;
let interval;
let startTime;
let lapStartTime;

const timeLabel = document.getElementById('time');
const lapButton = document.getElementById('lap');
const startButton = document.getElementById('start');
const lapsList = document.getElementById('laps');


startButton.addEventListener('click', startstop);
lapButton.addEventListener('click', lapreset);

function startstop() {
    if (!isRunning) {
        start();
    } else {
        stop();
    }
}

function start() {
    if (startTime === undefined) {
        startTime = new Date().getTime();
    } else {
        const currentTime = new Date().getTime();
        const pausedTime = currentTime - lapStartTime;
        startTime += pausedTime;
    }
    lapStartTime = new Date().getTime();
    interval = setInterval(updateTime, 10);
    isRunning = true;
    startButton.textContent = 'Stop';
    lapButton.textContent = 'Lap';
}

function stop() {
    clearInterval(interval);
    isRunning = false;
    startButton.textContent = 'Start';
    lapButton.textContent = 'Reset';
}


function updateTime() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const lapTime = currentTime - lapStartTime;
    const formattedTime = formatTime(elapsedTime);
    const formattedLapTime = formatTime(lapTime);
    timeLabel.textContent = formattedTime;
    if (isRunning) {
        lapButton.textContent = "Lap";
        startButton.textContent = "Stop";
    }
}


function formatTime(ms) {
    const date = new Date(ms);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}



function lapreset() {
    if (!isRunning) {
        reset();
    } else {
        lap();
    }
}

function lap() {
    const lapTime = formatTime(new Date().getTime() - lapStartTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
    lapsList.appendChild(lapItem);
    lapStartTime = new Date().getTime();
}

function reset() {
    clearInterval(interval);
    isRunning = false;
    startTime = undefined;
    lapCounter = 1;
    lapStartTime = undefined;
    timeLabel.textContent = '00:00:00.000';
    startButton.textContent = 'Start';
    lapButton.textContent = 'Lap';
    lapStartTime = 0;
    laps = [];
    lapsList.innerHTML = '';
}