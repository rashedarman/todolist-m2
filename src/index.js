import './style.css';

const todoTasks = [
  {
    index: 1,
    description: 'task 1',
    completed: false,
  },
  {
    index: 2,
    description: 'task 2',
    completed: false,
  },
  {
    index: 3,
    description: 'task 3',
    completed: false,
  },
];

const taskListElement = document.getElementById('task-list');

const renderTasks = () => {
  todoTasks.forEach((task) => {
    const li = document.createElement('li');
    li.textContent = task.description;
    taskListElement.appendChild(li);
  });
};

renderTasks();
