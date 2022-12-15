import './reset.css';
import './style.css';

const todoList = [
  {
    index: 1,
    description: 'wash the dishes',
    completed: false,
  },
  {
    index: 2,
    description: 'complete To Do list project',
    completed: false,
  },
];

const todoListUl = document.querySelector('.todo-list');
const renderTasks = () => {
  todoList.forEach(({ index, description, completed }) => {
    const todoId = `todo${index}`;
    const checked = completed ? 'checked' : '';

    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = `
      <input type="checkbox" ${checked} name="todo" id="${todoId}" />
      <label for="${todoId}">${description}</label>
      <ion-icon name="ellipsis-vertical-outline"></ion-icon>
    `;

    todoListUl.appendChild(li);
  });
};

renderTasks();
