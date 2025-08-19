document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
          span.setAttribute('style', 'text-decoration: line-through; color: gray;');
        } else {
          span.removeAttribute('style');
        }
      });
      li.appendChild(checkbox);
      const span = document.createElement('span');
      span.textContent = taskText;
      li.appendChild(span);
      const buttonExcluir = document.createElement('button');
      buttonExcluir.textContent = 'Excluir';
      buttonExcluir.addEventListener('click', function() {
        li.remove();
      });
      li.appendChild(buttonExcluir);
      taskList.appendChild(li);
      taskInput.value = '';
    }
  });
});
