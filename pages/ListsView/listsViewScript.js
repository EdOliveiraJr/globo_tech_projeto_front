document.addEventListener('DOMContentLoaded', () => {
    // Pega o ID do usuário que está logado
    const loggedInUserId = sessionStorage.getItem('loggedInUserId');

    // Se não houver usuário logado, redireciona para a página de login
    if (!loggedInUserId) {
        alert('Você precisa estar logado para ver suas listas.');
        window.location.href = '../Login/Login.html';
        return;
    }

    const addListButton = document.getElementById('addListButton');
    const newListInput = document.getElementById('newListInput');
    const listsListContainer = document.getElementById('listsList');

    const API_URL = `http://localhost:3000/users/${loggedInUserId}`;

    // Função para buscar os dados do usuário (incluindo as listas)
    async function fetchUserData() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Não foi possível carregar os dados do usuário.');
            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            alert('Falha ao comunicar com o servidor.');
        }
    }

    // Função para salvar as alterações no usuário (PATCH request)
    async function updateUserData(updatedUser) {
        try {
            const response = await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lists: updatedUser.lists })
            });
            if (!response.ok) throw new Error('Não foi possível salvar as alterações.');
            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            alert('Falha ao salvar as alterações no servidor.');
        }
    }

    // Função para renderizar (desenhar) as listas na tela
    function renderLists(lists = []) {
        listsListContainer.innerHTML = ''; // Limpa a lista atual
        lists.forEach(list => {
            const li = document.createElement('li');

            const listItemDiv = document.createElement('div');
            listItemDiv.classList.add('list-item');

            const label = document.createElement('label');
            label.textContent = list.title;
            listItemDiv.appendChild(label);
            li.appendChild(listItemDiv);

            // Botão de Editar
            const editButton = document.createElement('button');
            editButton.classList.add('edit-list-button');
            editButton.innerHTML = '<i class="material-icons">edit</i>';
            editButton.addEventListener('click', () => handleEditList(list.id));
            li.appendChild(editButton);

            // Botão de Deletar
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-list-button');
            deleteButton.innerHTML = '<i class="material-icons">delete</i>';
            deleteButton.addEventListener('click', () => handleDeleteList(list.id));
            li.appendChild(deleteButton);

            listsListContainer.appendChild(li);
        });
    }

    // Função para ADICIONAR uma nova lista
    async function handleAddList() {
        const listTitle = newListInput.value.trim();
        if (!listTitle) {
            alert('Por favor, insira um nome para a lista.');
            return;
        }

        const user = await fetchUserData();
        if (!user) return;

        const newList = {
            id: new Date().getTime().toString(), // ID único baseado no tempo
            title: listTitle,
            tasks: []
        };

        if (!user.lists) { 
        user.lists = []; // Inicializa como array vazio se não existir
        }

        user.lists.push(newList);
        const updatedUser = await updateUserData(user);
        if (updatedUser) {
            renderLists(updatedUser.lists);
            newListInput.value = ''; // Limpa o input
        }
    }

    // Função para EDITAR uma lista existente
    async function handleEditList(listId) {
        const newTitle = prompt('Digite o novo nome da lista:');
        if (!newTitle || !newTitle.trim()) return;

        const user = await fetchUserData();
        if (!user) return;

        const listToEdit = user.lists.find(list => list.id === listId);
        if (listToEdit) {
            listToEdit.title = newTitle.trim();
            const updatedUser = await updateUserData(user);
            if (updatedUser) {
                renderLists(updatedUser.lists);
            }
        }
    }

    // Função para DELETAR uma lista
    async function handleDeleteList(listId) {
        if (!confirm('Tem certeza que deseja deletar esta lista?')) return;

        const user = await fetchUserData();
        if (!user) return;

        user.lists = user.lists.filter(list => list.id !== listId);
        const updatedUser = await updateUserData(user);
        if (updatedUser) {
            renderLists(updatedUser.lists);
        }
    }

    // Carrega as listas do usuário quando a página é aberta
    async function initialize() {
        const user = await fetchUserData();
        if (user) {
            renderLists(user.lists);
        }
    }
    
    addListButton.addEventListener('click', handleAddList);
    initialize();
});
