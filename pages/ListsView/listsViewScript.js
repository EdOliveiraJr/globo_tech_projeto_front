window.addEventListener("load", () => {
  const addListButton = document.getElementById("addListButton");
  const newListInput = document.getElementById("newListInput");
  const listsList = document.getElementById("listsList");

  function addNewList(nome) {
    const li = document.createElement("li");

    const listItemDiv = document.createElement("div");
    listItemDiv.classList.add("list-item");

    const label = document.createElement("label");
    label.textContent = nome;
    listItemDiv.appendChild(label);
    li.appendChild(listItemDiv);

    const editButton = document.createElement("button");
    editButton.classList.add("edit-list-button");
    editButton.innerHTML = '<i class="material-icons">edit</i>';
    editButton.addEventListener("click", () => {
      const newName = prompt("Digite o novo nome da lista:", label.textContent);
      if (newName && newName.trim() !== "") {
        label.textContent = newName.trim();
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-list-button");
    deleteButton.innerHTML = '<i class="material-icons">delete</i>';
    deleteButton.addEventListener("click", () => {
      if (confirm(`Tem certeza que deseja deletar a lista "${label.textContent}"?`)) {
        listsList.removeChild(li);
      }
    });

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    listsList.appendChild(li);
  }

  addListButton.addEventListener("click", () => {
    const nome = newListInput.value.trim();
    if (nome === "") {
      alert("Digite um nome para a lista.");
      return;
    }
    addNewList(nome);
    newListInput.value = "";
  });

  const existingLists = listsList.querySelectorAll("li");
  existingLists.forEach((li) => {
    const label = li.querySelector("label");
    const editButton = li.querySelector(".edit-list-button");
    const deleteButton = li.querySelector(".delete-list-button");

    if (editButton) {
      editButton.addEventListener("click", () => {
        const newName = prompt("Editar nome da lista:", label.textContent);
        if (newName && newName.trim() !== "") {
          label.textContent = newName.trim();
        }
      });
    }

    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        if (confirm(`Tem certeza que deseja deletar a lista "${label.textContent}"?`)) {
          li.remove();
        }
      });
    }
  });
});

