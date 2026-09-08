export default function Timer({
  minutesDisplay,
  secondsDisplay,
  sound,
  resetControl,
}) {

  let countDown = null;
  let minutes = Number(minutesDisplay.textContent);
  // Absolute timestamp at which the current session must finish.
  let endTime = 0;
  // Remaining duration, kept so pause()/start() resume exactly.
  let remainingMs = 0;

  function start() {
    // Never stack two countdowns.
    if (countDown) {
      return;
    }

    // Resume from where we paused, or start fresh from the display.
    if (remainingMs <= 0) {
      remainingMs = (Number(minutesDisplay.textContent) * 60 + Number(secondsDisplay.textContent)) * 1000;
    }
    endTime = Date.now() + remainingMs;

    // Tick faster than 1s so the display stays crisp, but always compute the
    // remaining time from the wall clock. 
    countDown = setInterval(() => {
      remainingMs = endTime - Date.now();

      if (remainingMs <= 0) {
        remainingMs = 0;
        render(0);
        endSession();
        return;
      }

      render(remainingMs);
    }, 250);
  }

  function render(ms) {
    const totalSeconds = Math.ceil(ms / 1000);
    const newMinutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    minutesDisplay.textContent = `${newMinutes}`;
    secondsDisplay.textContent = `${seconds < 10 ? '0' : ''}${seconds}`;
  }

  function endSession() {
    clearInterval(countDown);
    countDown = null;
    endTime = 0;
    remainingMs = 0;
    resetControl();
    sound.timeEnd();
    reset();
  }

  function pause() {
    if (!countDown) {
      return;
    }

    clearInterval(countDown);
    countDown = null;
    remainingMs = endTime - Date.now();

    if (remainingMs < 0) {
      remainingMs = 0;
    }
  }

  function reset() {
    if (countDown) {
      clearInterval(countDown);
      countDown = null;
    }

    endTime = 0;
    remainingMs = 0;
    minutesDisplay.textContent = `${minutes}`;
    secondsDisplay.textContent = '00';
  }

  function updateTimer() {
    minutes = Number(minutesDisplay.textContent);
  }

  return {
    start,
    reset,
    pause,
    updateTimer,
  }
}

