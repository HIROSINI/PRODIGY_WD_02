let time = 0;
let timer;
let isRunning = false;
const lapTimes = [];

function startTimer() {
    timer = setInterval(() => {
        time += 10;
        displayTime();
    }, 10);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    time = 0;
    lapTimes.length = 0;
    displayTime();
    displayLaps();
}

function lapTimer() {
    lapTimes.push(time);
    displayLaps();
}

function displayTime() {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;

    document.getElementById('display').textContent = formattedTime;
}

function displayLaps() {
    const lapTimesBody = document.getElementById('lapTimesBody');
    lapTimesBody.innerHTML = '';

    lapTimes.forEach((lapTime, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${index + 1}</td><td>${formatTime(lapTime)}</td>`;
        lapTimesBody.appendChild(row);
    });
}

function formatTime(timeInMillis) {
    const hours = Math.floor(timeInMillis / 3600000);
    const minutes = Math.floor((timeInMillis % 3600000) / 60000);
    const seconds = Math.floor((timeInMillis % 60000) / 1000);
    const milliseconds = timeInMillis % 1000;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

document.getElementById('startBtn').addEventListener('click', () => {
    if (!isRunning) {
        startTimer();
        isRunning = true;
    }
});

document.getElementById('stopBtn').addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
        isRunning = false;
    }
});

document.getElementById('resetBtn').addEventListener('click', resetTimer);

document.getElementById('lapBtn').addEventListener('click', lapTimer);
