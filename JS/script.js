window.onload = loadTasks;

// to add event so that task is added to list when button is clicked
document.getElementById("submitBtn").addEventListener("click", e => {
    e.preventDefault();
    addTask();
});

// to cretae task to add to list
function addTask() {
    const task = document.getElementById("userInput");
    const list = document.getElementById("tasks");
    // return if task is empty
    if (task.value === "") {
        alert("Please add a valid task!");
        return false;
    }

    // to add task to local storage
    localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));

    // to create list item, add innerHTML and append to ul
    const div = document.createElement("div");
    div.innerHTML = `<input id="check" type="checkbox" onclick="taskComplete(this)" class="check">
    <input type="text" value="${task.value}" id="listInput" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
    <i class="fa fa-trash" onclick="removeTask(this)" id="delete"></i>`;
    list.insertBefore(div, list.children[0]);
    // clear input
    task.value = "";
}

// to remove tasks
function removeTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
        if (task.task === event.parentNode.children[1].value) {
            // delete task
            tasks.splice(tasks.indexOf(task), 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.parentElement.remove();
}

// to edit the task and update local storage
function editTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    // check if task is empty
    if (event.value === "") {
        alert("Task is empty!");
        event.value = currentTask;
        return;
    }
    // to check is task already exists
    tasks.forEach(task => {
        if (task.task === event.value) {
            alert("This task already exists!");
            event.value = currentTask;
            return;
        }
    });
    // to update task
    tasks.forEach(task => {
        if (task.task === currentTask) {
            task.task = event.value;
        }
    });
    //to update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//to mark task off as complete
function taskComplete(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
        if (task.task === event.nextElementSibling.value) {
            task.completed = !task.completed;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.nextElementSibling.classList.toggle("completed");
}

// to store tasks
var currentTask = null;

//to get current task
function getCurrentTask(event) {
    currentTask = event.value;
}

function loadTasks() {
    //to check if localStorage has any tasks
    if (localStorage.getItem("tasks") == null) return;

    // to get the tasks from localStorage and convert it to an array
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

    //to loop through the tasks and add them to the list
    tasks.forEach(task => {
        const list = document.getElementById("tasks");
        const div = document.createElement("div");
        div.innerHTML = `<input id="check" type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
   <input type="text" value="${task.task}" id="listInput" class="task" ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
   <i class="fa fa-trash" onclick="removeTask(this)" id="delete"></i>`;
        list.insertBefore(div, list.children[0]);
    });
}