import { todoListObj } from './modules/local-storage.js';
import { Todo, TodoList } from './modules/todo-list.js';
import './reset.css';
import './style.css';

const todoListUl = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input');

const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
};

const renderTodos = () => {
  clearElement(todoListUl);

  todoListObj.forEach(({ index, description, completed }) => {
    const checked = completed ? 'checked' : '';
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.setAttribute('data-todo-id', index);

    li.innerHTML = `
      <input type="checkbox" name="completed" ${checked} />
      <input type="text" name="description" value="${description}">
      <ion-icon name="ellipsis-vertical-outline" class="move-btn"></ion-icon>
      <ion-icon name="trash-outline" class="delete-btn"></ion-icon>
    `;

    todoListUl.appendChild(li);
  });
};

const getTodoIndex = (element) => {
  const parent = element.closest('li');
  const { todoId } = parent.dataset;
  return todoId;
};

todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    const todo = new Todo(e.target.value);
    TodoList.add(todo);

    renderTodos();
  }
});

todoListUl.addEventListener('click', (e) => {
  if (e.target.classList.contains('move-btn')) {
    const parent = e.target.closest('li');

    const moveBtn = parent.querySelector('.move-btn');
    const deleteBtn = parent.querySelector('.delete-btn');

    moveBtn.style.display = 'none';
    deleteBtn.style.display = 'block';
  }

  if (e.target.classList.contains('delete-btn')) {
    const todoId = getTodoIndex(e.target);
    TodoList.remove(todoId);

    renderTodos();
  }
});

todoListUl.addEventListener('keyup', (e) => {
  if (e.target.matches("input[name='description']")) {
    const todoId = getTodoIndex(e.target);
    const todoDescription = e.target.value;
    TodoList.update(todoId, todoDescription);
  }
});

renderTodos();
