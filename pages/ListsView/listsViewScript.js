document.addEventListener('DOMContentLoaded', () => {
  
  const API_URL = "http://localhost:3000/users";
  const addListButton = document.getElementById("addListButton");
  const newListInput = document.getElementById("newListInput");
  const listsList = document.getElementById("listsList");

  
  const userId = sessionStorage.getItem("loggedInUserId");
  if (!userId) {
    alert("Você precisa estar logado para ver suas listas.");
    window.location.href = '../Login/Login.html';
    return; 
  }

  /**
   * Busca os dados completos do usuário na API.
   * @returns {Promise<object>} 
   */
  async function fetchUserData() {
    const response = await fetch(`${API_URL}/${userId}`);
    if (!response.ok) {
      throw new Error("Não foi possível carregar os dados do usuário.");
    }
    return response.json();
  }

  /**
   * Atualiza os dados do usuário na API.
   * @param {object} userData - O objeto completo do usuário a ser salvo.
   */
  async function updateUserData(userData) {
   
    try {
      const response = await fetch(`${API_URL}/${userData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Falha ao salvar as alterações no servidor.");
      }
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      alert(error.message); 
    }
  }

  /**
   * Renderiza uma única lista na interface.
   * @param {object} list - O objeto da lista a ser renderizada.
   */
  function renderList(list) {
    const li = document.createElement("li");
    li.dataset.listId = list.id;

    const listItemDiv = document.createElement("div");
    listItemDiv.classList.add("list-item");

    const label = document.createElement("label");
    label.textContent = list.title;
    label.addEventListener("click", () => {
      
      window.location.href = `../TasksView/TasksView.html?listId=${list.id}`;
    });
    listItemDiv.appendChild(label);

    const editButton = document.createElement("button");
    editButton.classList.add("edit-list-button");
    editButton.innerHTML = '<i class="material-icons">edit</i>';
    editButton.addEventListener("click", () => handleEditList(list.id));

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-list-button");
    deleteButton.innerHTML = '<i class="material-icons">delete</i>';
    deleteButton.addEventListener("click", () => handleDeleteList(list.id));
    
    li.appendChild(listItemDiv); 
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    listsList.appendChild(li);
  }
  
  /**
   * Lida com a edição do nome de uma lista.
   * @param {string} listId - O ID da lista a ser editada.
   */
  async function handleEditList(listId) {
    const user = await fetchUserData();
    const listToEdit = user.lists.find(l => l.id === listId);
    if (!listToEdit) return;

    const newName = prompt("Digite o novo nome da lista:", listToEdit.title);
    if (newName && newName.trim() !== "" && newName.trim() !== listToEdit.title) {
      listToEdit.title = newName.trim();
      await updateUserData(user);
      loadLists(); 
    }
  }

  /**
   * Lida com a exclusão de uma lista.
   * @param {string} listId - O ID da lista a ser excluída.
   */
  async function handleDeleteList(listId) {
    const user = await fetchUserData();
    const listToDelete = user.lists.find(l => l.id === listId);
    if (!listToDelete) return;
    
    if (confirm(`Tem certeza que deseja deletar a lista "${listToDelete.title}"?`)) {
      user.lists = user.lists.filter(l => l.id !== listId);
      await updateUserData(user);
      loadLists(); 
    }
  }

 
  async function handleAddList() {
    const title = newListInput.value.trim();
    if (title === "") {
      alert("Digite um nome para a lista.");
      return;
    }

    try {
      const user = await fetchUserData();
      
      const newList = {
        id: crypto.randomUUID(),
        title: title,
        tasks: []
      };

      
      if (!Array.isArray(user.lists)) {
        user.lists = [];
      }
      user.lists.push(newList);

      await updateUserData(user);
      renderList(newList); 
      newListInput.value = "";

    } catch (error) {
      console.error("Erro ao adicionar lista:", error);
      alert("Não foi possível adicionar a lista.");
    }
  }

  
  async function loadLists() {
    try {
      const user = await fetchUserData();
      listsList.innerHTML = ''; 

      if (user.lists && user.lists.length > 0) {
        user.lists.forEach(list => renderList(list));
      } else {
        listsList.innerHTML = '<li><p>Nenhuma lista encontrada. Crie uma nova!</p></li>';
      }
    } catch (error) {
      console.error("Erro ao carregar listas:", error);
      alert(error.message);
    }
  }

  
  addListButton.addEventListener("click", handleAddList);
  
  newListInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleAddList();
    }
  });
  
  
  loadLists();
});
