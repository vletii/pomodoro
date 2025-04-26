// TODO add task list controls

// export default function Controls({
//   buttonPlay,
//   buttonPause,
// }) {

//   function play() {
//     buttonPlay.classList.add('hide')
//     buttonPause.classList.remove('hide')
//   }

//   function pause() {
//     buttonPlay.classList.remove('hide')
//     buttonPause.classList.add('hide')
//   }

//   function reset() {
//     buttonPlay.classList.remove('hide')
//     buttonPause.classList.add('hide')
//   }


//   return {
//     reset,
//     play,
//     pause,
//   } 
// }


const toggle = document.getElementById('toggle');
const body = document.body;

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