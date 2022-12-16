export const TODO_LIST_KEY = 'todo.list';

// this to prevent line break by formatter (eslint causes error)
const _todoListObj = localStorage.getItem(TODO_LIST_KEY);
export const todoListObj = JSON.parse(_todoListObj) || [];

export const saveTodoObj = () => {
  localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoListObj));
};
