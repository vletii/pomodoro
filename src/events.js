import {
  buttonPlay, 
  buttonPause, 
  buttonStop,
  buttonToggleMode,
} from './elements.js'
  
export default function Events({
  controls,
  timer,
}) {
  
  buttonPlay.addEventListener('click', () => {
    controls.play()  
    timer.countDown()  
  })

  buttonPause.addEventListener('click', () => {
    controls.pause()
    timer.hold()
  })

  buttonStop.addEventListener('click', () => {
    controls.reset()   
    timer.reset()
  })
  
  buttonToggleMode.addEventListener('click', () => {
    const body = document.body;
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

  })

  

}