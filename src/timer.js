export default function Timer({
  minutesDisplay,
  secondsDisplay,
  sound,
}) {

  let countDownInterval;

  function start() {
    
    let timeLeft = Number(minutesDisplay.textContent) * 60 + Number(secondsDisplay.textContent);
    countDownInterval = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;

      minutesDisplay.textContent = `${minutes}`;
      secondsDisplay.textContent = `${seconds < 10 ? '0' : ''}${seconds}`;
      timeLeft--;

      if (timeLeft < 0) {
        clearInterval(countDownInterval);
        sound.timeEnd();
      }
      
    }, 1000);
  }

  function pause() {
    clearInterval(countDownInterval);
  }

  function reset() {
    clearInterval(countDownInterval);
    minutesDisplay.textContent = `${'25'}`;
    secondsDisplay.textContent = `${'00'}`;
  }

  function updateTimer(newMinutes, seconds) {
    newMinutes = newMinutes === undefined ? minutes : newMinutes
    seconds = seconds === undefined ? 0 : seconds
    minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
    secondsDisplay.textContent = String(seconds).padStart(2, "0")
  }

  return {
    start,
    reset,
    pause,
    updateTimer,
  }
}

