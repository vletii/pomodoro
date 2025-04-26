export default function Timer({
  minutesDisplay,
  secondsDisplay,
  sound,
  resetControl,
}) {

  let countDown;
  let minutes = Number(minutesDisplay.textContent)

  function start() {
    let timeLeft = Number(minutesDisplay.textContent) * 60 + Number(secondsDisplay.textContent);
    countDown = setInterval(() => {
      const newMinutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;

      minutesDisplay.textContent = `${newMinutes}`;
      secondsDisplay.textContent = `${seconds < 10 ? '0' : ''}${seconds}`;
      timeLeft--;

      if (timeLeft < 0) {
        reset();
        resetControl();
        sound.timeEnd();
      }
      
    }, 1000);
  }

  function pause() {
    clearInterval(countDown);
  }

  function reset() {
    clearInterval(countDown);
    minutesDisplay.textContent = `${minutes}`;
    secondsDisplay.textContent = `${'00'}`;
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

