window.addEventListener("load", () => {
  const addTaskButton = document.getElementById("addTaskButton");
  const newTaskInput = document.getElementById("newTaskInput");
  const taskList = document.getElementById("taskList");

  function addNewTask(nome) {
    const li = document.createElement("li");

    const taskItemDiv = document.createElement("div");
    taskItemDiv.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    taskItemDiv.appendChild(checkbox);

    const label = document.createElement("label");
    label.textContent = nome;
    taskItemDiv.appendChild(label);
    li.appendChild(taskItemDiv);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        label.classList.add("task-completed");
      } else {
        label.classList.remove("task-completed");
      }
    });

    const editButton = document.createElement("button");
    editButton.classList.add("edit-task-button");
    editButton.innerHTML = '<i class="material-icons">edit</i>';
    editButton.addEventListener("click", () => {
      const newName = prompt("Digite o novo nome da tarefa:", label.textContent);
      if (newName && newName.trim() !== "") {
        label.textContent = newName.trim();
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-task-button");
    deleteButton.innerHTML = '<i class="material-icons">delete</i>';
    deleteButton.addEventListener("click", () => {
      if (confirm(`Tem certeza que deseja deletar a tarefa "${label.textContent}"?`)) {
        taskList.removeChild(li);
      }
    });

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  }

  addTaskButton.addEventListener("click", () => {
    const nome = newTaskInput.value.trim();
    if (nome === "") {
      alert("Digite um nome para a tarefa.");
      return;
    }
    addNewTask(nome);
    newTaskInput.value = "";
  });

  const existingCheckboxes = document.querySelectorAll(".task-checkbox");
  existingCheckboxes.forEach((cb) => {
    const label = cb.parentElement.querySelector("label");

    cb.addEventListener("change", () => {
      if (cb.checked) {
        label.classList.add("task-completed");
      } else {
        label.classList.remove("task-completed");
      }
    });

    if (cb.checked) {
      label.classList.add("task-completed");
    }
  });

  const existingTasks = taskList.querySelectorAll("li");
  existingTasks.forEach((li) => {
    const label = li.querySelector("label");
    const editButton = li.querySelector(".edit-task-button");
    const deleteButton = li.querySelector(".delete-task-button");

    if (editButton) {
      editButton.addEventListener("click", () => {
        const newName = prompt("Editar nome da tarefa:", label.textContent);
        if (newName && newName.trim() !== "") {
          label.textContent = newName.trim();
        }
      });
    }

    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        if (confirm(`Tem certeza que deseja deletar a tarefa "${label.textContent}"?`)) {
          li.remove();
        }
      });
    }
  });
});
