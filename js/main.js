let hoursDisplay = document.getElementById("hours");
let minutesDisplay = document.getElementById("minutes");
let secondDisplay = document.getElementById("seconds");
function startTimer(hoursInput, minutesInput, secondsInput) {
  let hours = parseInt(hoursInput) || 0;
  let minutes = parseInt(minutesInput) || 0;
  let seconds = parseInt(secondsInput) || 0;
  let duration = hours * 3600 + minutes * 60 + seconds;
  let timer = duration;
  let intervalId;
  let isPaused = false;
  let pauseTime = 0;

  function updateDisplay() {
    let hours = Math.floor(timer / 3600);
    let minutes = Math.floor((timer % 3600) / 60);
    let seconds = timer % 60;

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    hoursDisplay.innerHTML = hours;
    minutesDisplay.innerHTML = minutes;
    secondDisplay.innerHTML = seconds;
  }

  function countdown() {
    if (isPaused) {
      return;
    }

    updateDisplay();

    if (--timer < 0) {
      clearInterval(intervalId);
    }
  }

  function start() {
    if (!intervalId) {
      intervalId = setInterval(countdown, 1000);
    }
    isPaused = false;
  }

  function pause() {
    if (!isPaused) {
      isPaused = true;
      pauseTime = timer;
    }
  }

  function resume() {
    if (isPaused) {
      isPaused = false;
      timer = pauseTime;
      intervalId = setInterval(countdown, 1000);
    }
  }

  function reset() {
    stop();
    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
  }

  return {
    start,
    pause,
    resume,
    reset,
  };
}
// setting timer manually
let startpoint = startTimer(25, 0, 0);
document.getElementById("start").addEventListener("click", startpoint.start);
document.getElementById("pause").addEventListener("click", startpoint.pause);
document.getElementById("reset").addEventListener("click", startpoint.reset);
