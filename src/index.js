import Controls from './controls.js'
import Timer from './timer.js'
import Events from './events.js'

import {
  buttonPlay, 
  buttonPause, 
  minutesDisplay,
  secondsDisplay
} from './elements.js'

const controls = Controls({
  buttonPlay,
  buttonPause,
  minutesDisplay,
})

const timer = Timer({
  minutesDisplay,
  secondsDisplay,
  resetControls: controls.reset,
})


Events({
  controls,
  timer
})


