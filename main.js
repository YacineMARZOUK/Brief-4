
const showBtn = document.getElementById("popup");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const submitModal = document.getElementById("submitModal");



let editingTask = null;

showBtn.addEventListener("click", function () {
    overlay.classList.remove("hidden");
});

submitModal.addEventListener("click", function () {

    const nom = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const status = document.getElementById('status').value;
    const date = document.getElementById('date').value;

    if (nom && status && priority) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selectedDate = new Date(date);
        
        if (selectedDate < today) {
            alert("The due date cannot be in the past!");
            return; 
        }

        if (editingTask) {
            editingTask.querySelector(".task-name").textContent = nom;
            editingTask.querySelector(".task-date").textContent = date;
            editingTask.querySelector(".task-priority").textContent = priority;
            
            const currentStatus = editingTask.parentNode.id;

            if (currentStatus !== status) {
                document.getElementById(currentStatus).removeChild(editingTask);
                document.getElementById(status).appendChild(editingTask);
            }

            editingTask = null; 
        } else {
            const taskElement = document.createElement("div");
            taskElement.className = "flex justify-evenly";
            taskElement.innerHTML = `
            <h1 class="task-name">${nom}</h1>
            <p class="task-date">${date}</p>
            <p class="task-priority">${priority}</p>
            <button class="edit-btn py-2 px-3 text-white hover:bg-blue-700 dark:text-white rounded dark:text-white cursor-pointer py-0">
                Edit
            </button>`;

            document.getElementById(status).appendChild(taskElement);

            taskElement.querySelector(".edit-btn").addEventListener("click", function () {
                editTask(taskElement);
            });
        }
        overlay.classList.add("hidden");
    } else {
        alert("Fields should not be empty");
    }
});

closeBtn.addEventListener("click", function () {
    overlay.classList.add("hidden");
});

function editTask(taskElement) {
    overlay.classList.remove("hidden");
    editingTask = taskElement;

    document.getElementById('name').value = taskElement.querySelector(".task-name").textContent;
    document.getElementById('date').value = taskElement.querySelector(".task-date").textContent;
    document.getElementById('priority').value = taskElement.querySelector(".task-priority").textContent;

    const currentStatus = taskElement.parentNode.id;
    document.getElementById('status').value = currentStatus;
}
