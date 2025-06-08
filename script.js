console.log("✅ script.js loaded");

let startTime, interval;
let elapsedTime = 0;
let running = false;

let lapCount = 0;
let lastLapTime = 0;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(ms) {
  const date = new Date(ms);
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  const sec = String(date.getUTCSeconds()).padStart(2, '0');
  const milli = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
  return `${min}:${sec}:${milli}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

document.getElementById("start").onclick = () => {
  if (!running) {
    running = true;
    startTime = Date.now() - elapsedTime;
    interval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }
};

document.getElementById("pause").onclick = () => {
  if (running) {
    running = false;
    clearInterval(interval);
  }
};

document.getElementById("reset").onclick = () => {
  running = false;
  clearInterval(interval);
  elapsedTime = 0;
  lapCount = 0;
  lastLapTime = 0;
  updateDisplay();
  laps.innerHTML = '';
};

document.getElementById("lap").onclick = () => {
  if (running) {
    lapCount++;

    const lapTime = elapsedTime;
    const lapDiff = lapTime - lastLapTime;
    lastLapTime = lapTime;

    const lapItem = document.createElement("div");
    lapItem.classList.add("lap-row");

    lapItem.innerHTML = `
      <span class="lap-num">${lapCount.toString().padStart(2, '0')}</span>
      <span class="lap-diff">+ ${formatTime(lapDiff)}</span>
      <span class="lap-time">${formatTime(lapTime)}</span>
    `;

    laps.prepend(lapItem); // newest at top
  }
};
