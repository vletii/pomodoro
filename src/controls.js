export default function Controls({
  startButton,
  pauseButton,
  plusButton, 
  minusButton,
  minutesDisplay,
}) {

  function start() {
    startButton.classList.add('hide');
    plusButton.classList.add('hide');
    minusButton.classList.add('hide');
    pauseButton.classList.remove('hide');
  }

  function pause() {
    startButton.classList.remove('hide')
    pauseButton.classList.add('hide')
  }

  function reset() {
    pauseButton.classList.add('hide');
    startButton.classList.remove('hide');
    plusButton.classList.remove('hide');
    minusButton.classList.remove('hide');
  }

  function addMinutes() {
    let minutes = Number(minutesDisplay.textContent)
    // cap it at 150 min = 2h30
    if (minutes >= 150)
      return minutes;

    return minutes + 5;
  }

  function subtractMinutes() {
    let minutes = Number(minutesDisplay.textContent)
    // limit it at 5 min
    if (minutes <= 5)
      return minutes;

    return minutes - 5;
  }

  return {
    start, 
    pause, 
    reset, 
    addMinutes, 
    subtractMinutes,
  } 
}