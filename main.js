let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksContainer = document.querySelector(".tasks");

// Load tasks from localStorage
let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks when the page loads
window.onload = () => {
  renderTasks(tasksArray);
};

// Add new task when "Add Task" button is clicked
submit.onclick = function () {
  if (input.value.trim() !== "") {
    addTask(input.value.trim());
    input.value = "";
  }
};

// Add task to array and update page + localStorage
function addTask(taskTitle) {
  const task = {
    id: Date.now(),
    title: taskTitle,
    completed: false,
  };
  tasksArray.push(task);
  updateLocalStorage();
  renderTasks(tasksArray);
}

// Render tasks to the page
function renderTasks(array) {
  tasksContainer.innerHTML = "";

  array.forEach((task) => {
    // Main task container
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.setAttribute("data-id", task.id);
    if (task.completed) taskDiv.classList.add("done");

    // Task title
    const textDiv = document.createElement("div");
    textDiv.className = "task-text";
    textDiv.textContent = task.title;

    // Buttons container
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "task-buttons";

    // Done button
    const doneBtn = document.createElement("span");
    doneBtn.className = "done-btn";
    doneBtn.textContent = "Done";

    // Delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    // Done button functionality
    doneBtn.addEventListener("click", () => {
      document.getElementById("done").play();
      task.completed = !task.completed;
      updateLocalStorage();
      renderTasks(tasksArray);
    });

    // Delete button functionality
    deleteBtn.addEventListener("click", () => {
      tasksArray = tasksArray.filter((t) => t.id !== task.id);
      updateLocalStorage();
      renderTasks(tasksArray);
    });

    // Build and append elements
    buttonsDiv.appendChild(doneBtn);
    buttonsDiv.appendChild(deleteBtn);
    taskDiv.appendChild(textDiv);
    taskDiv.appendChild(buttonsDiv);
    tasksContainer.appendChild(taskDiv);
  });
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
