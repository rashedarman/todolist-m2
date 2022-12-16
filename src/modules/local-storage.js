export const TODO_LIST_KEY = 'todo.list';

export const todoListObj =
  JSON.parse(localStorage.getItem(TODO_LIST_KEY)) || [];

export const saveTodoObj = () => {
  localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoListObj));
};
