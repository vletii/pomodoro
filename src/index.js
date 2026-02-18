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
const timer = Timer({minutesDisplay, secondsDisplay, sound, resetControl: controls.reset});

let task = JSON.parse(localStorage.getItem("task")) || [];

const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const addTaskButton = document.getElementById("add-task-button");
const clearCompletedButton = document.getElementById("clear-completed-button");
const clearAllButton = document.getElementById("clear-all-button");

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

resetButton.addEventListener('click', () => {
  controls.reset();
  sound.pressButton();
  timer.reset();
});

plusButton.addEventListener('click', () => {
  sound.pressButton();
  minutesDisplay.innerText = `${controls.addMinutes()}`;
  timer.updateTimer();
});

minusButton.addEventListener('click', () => {
  sound.pressButton();
  minutesDisplay.innerText = `${controls.subtractMinutes()}`;
  timer.updateTimer();
})


// potentially move this to another spot?
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

addTaskButton.addEventListener("click", () => {
  addTask();
});

taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

clearCompletedButton.addEventListener("click", clearCompletedTasks);

clearAllButton.addEventListener("click", clearAllTasks);

renderTasks();

function addTask() {
  console.log("Adding task...");
  const newTask = taskInput.value.trim();
  if (newTask === "") {
    return;
  }

  task.push({text: newTask, completed: false});
  saveToLocalStorage();
  renderTasks();
  taskInput.value = "";
}

function clearCompletedTasks() {
  console.log("Clearing completed tasks...");
  // Remove completed tasks

}

function clearAllTasks() {
  console.log("Clearing all tasks...");
  task = [];
  localStorage.removeItem("task");
  renderTasks();
}

function renderTasks() {
  const taskListContainer = document.querySelector("#task-list ul");
  taskListContainer.innerHTML = "";

  task.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <div class="task-container">
        <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""} data-index="${index}">
        <span class="task-text ${task.completed ? "completed" : ""}">${task.text}</span>
      </div>
    `;
    taskItem.querySelector(".task-checkbox").addEventListener("change", function() {
      task[index].completed = this.checked; // Mark task as completed or not
      saveToLocalStorage();
      renderTasks();
    });
    taskListContainer.appendChild(taskItem);
  });
}

function saveToLocalStorage() {
  localStorage.setItem("task", JSON.stringify(task));
}