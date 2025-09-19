document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000/users";

  
  const addTaskButton = document.getElementById("addTaskButton");
  const newTaskInput = document.getElementById("newTaskInput");
  const taskList = document.getElementById("taskList");
  const listTitleElement = document.querySelector(".tasks-view-container .title h1");
  const backButton = document.querySelector(".tasks-view-container .title i");


  const userId = sessionStorage.getItem("loggedInUserId");
  const urlParams = new URLSearchParams(window.location.search);
  const listId = urlParams.get('listId');

  if (!userId) {
    alert("Acesso negado. Faça o login para continuar.");
    window.location.href = '../Login/Login.html';
    return;
  }
  
  if (!listId) {
    alert("ID da lista não fornecido. Redirecionando...");
    window.location.href = '../ListsView/ListsView.html';
    return;
  }
  
  backButton.addEventListener('click', () => {
    window.location.href = '../ListsView/ListsView.html';
  });


  async function fetchUserData() {
    const response = await fetch(`${API_URL}/${userId}`);
    if (!response.ok) throw new Error("Não foi possível carregar os dados do usuário.");
    return response.json();
  }

  async function updateUserData(userData) {
    try {
      const response = await fetch(`${API_URL}/${userData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("Falha ao salvar as alterações.");
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      alert(error.message);
    }
  }


  function renderTask(task) {
    const li = document.createElement("li");
    li.dataset.taskId = task.id;

    const taskItemDiv = document.createElement("div");
    taskItemDiv.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => handleToggleTask(task.id, checkbox.checked));
    
    const label = document.createElement("label");
    label.textContent = task.description;
    if (task.completed) {
      label.classList.add("task-completed");
    }

    taskItemDiv.appendChild(checkbox);
    taskItemDiv.appendChild(label);

    const editButton = document.createElement("button");
    editButton.classList.add("edit-task-button");
    editButton.innerHTML = '<i class="material-icons">edit</i>';
    editButton.addEventListener("click", () => handleEditTask(task.id));

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-task-button");
    deleteButton.innerHTML = '<i class="material-icons">delete</i>';
    deleteButton.addEventListener("click", () => handleDeleteTask(task.id));

    li.appendChild(taskItemDiv);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }

  
  async function handleToggleTask(taskId, isCompleted) {
    const user = await fetchUserData();
    const list = user.lists.find(l => l.id === listId);
    if (!list) return;
    const task = list.tasks.find(t => t.id === taskId);
    if (!task) return;

    task.completed = isCompleted;
    
    task.completedAt = isCompleted ? new Date().toISOString() : null;
    
    await updateUserData(user);
    loadTasks(); 
  }
  
  async function handleEditTask(taskId) {
      const user = await fetchUserData();
      const list = user.lists.find(l => l.id === listId);
      const task = list.tasks.find(t => t.id === taskId);
      if(!task) return;

      const newDescription = prompt("Edite a tarefa:", task.description);
      if(newDescription && newDescription.trim() !== "" && newDescription.trim() !== task.description) {
          task.description = newDescription.trim();
          await updateUserData(user);
          loadTasks();
      }
  }

  async function handleDeleteTask(taskId) {
      const user = await fetchUserData();
      const list = user.lists.find(l => l.id === listId);
      const task = list.tasks.find(t => t.id === taskId);
      if(!task) return;

      if(confirm(`Tem certeza que deseja apagar a tarefa "${task.description}"?`)) {
          list.tasks = list.tasks.filter(t => t.id !== taskId);
          await updateUserData(user);
          loadTasks();
      }
  }

  async function handleAddTask() {
    const description = newTaskInput.value.trim();
    if (description === "") {
      alert("Digite um nome para a tarefa.");
      return;
    }

    try {
      const user = await fetchUserData();
      const currentList = user.lists.find(list => list.id === listId);
      if (!currentList) throw new Error("Lista não encontrada.");
      
      const newTask = {
        id: crypto.randomUUID(),
        description: description,
        completed: false, 
        createdAt: new Date().toISOString(),
        completedAt: null
      };

      if (!Array.isArray(currentList.tasks)) {
        currentList.tasks = [];
      }
      currentList.tasks.push(newTask);
      
      await updateUserData(user);
      renderTask(newTask); 
      newTaskInput.value = "";
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      alert("Não foi possível adicionar a tarefa.");
    }
  }

  
  async function loadTasks() {
    try {
      const user = await fetchUserData();
      const currentList = user.lists.find(list => list.id === listId);

      if (!currentList) {
        throw new Error("Lista não encontrada para este usuário.");
      }
      
      listTitleElement.textContent = currentList.title;
      taskList.innerHTML = ''; 

      if (currentList.tasks && currentList.tasks.length > 0) {
        currentList.tasks.forEach(task => renderTask(task));
      } else {
        taskList.innerHTML = '<li><p>Nenhuma tarefa aqui. Adicione uma!</p></li>';
      }

    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      alert(error.message);
      window.location.href = '../ListsView/ListsView.html';
    }
  }

  
  addTaskButton.addEventListener("click", handleAddTask);
  newTaskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  });

  
  loadTasks();
});
