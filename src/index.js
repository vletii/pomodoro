// TODO add to do list
// TODO set custom time

import Sound from './sound.js'
import Controls from './controls.js'
import Timer from './timer.js';

const toggle = document.getElementById('toggle');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('stop');
const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');

const minutesDisplay = document.querySelector('.minutes');
const secondsDisplay = document.querySelector('.seconds');
const body = document.body;

const sound = Sound();
const controls = Controls({startButton, pauseButton, plusButton, minusButton, minutesDisplay});
const timer = Timer({minutesDisplay, secondsDisplay, sound});


startButton.addEventListener('click', () => {
  controls.start();
  sound.pressButton();
  timer.start();
});

pauseButton.addEventListener('click', () => {
  controls.pause();
  sound.pressButton();
  timer.pause();
});


// TODO find a way to reset it to the time someone else set it to
resetButton.addEventListener('click', () => {
  controls.reset();
  sound.pressButton();
  timer.reset();
});


plusButton.addEventListener('click', () => {
  sound.pressButton();
  minutesDisplay.innerText = `${controls.addMinutes()}`;
});

minusButton.addEventListener('click', () => {
  sound.pressButton();
  minutesDisplay.innerText = `${controls.subtractMinutes()}`;
})


toggle.addEventListener('click', () => {
  const isDarkMode = body.classList.contains('bg-black');

  if (isDarkMode) {
      body.classList.remove('bg-black', 'text-white');
      body.classList.add('bg-white', 'text-black');
      toggle.classList.remove('dark');
  } else {
      body.classList.remove('bg-white', 'text-black');
      body.classList.add('bg-black', 'text-white');
      toggle.classList.add('dark');
  }
});
