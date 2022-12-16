export const TODO_LIST_KEY = 'todo.list';

// this to prevent line break by formatter (eslint causes error)
const t = localStorage.getItem(TODO_LIST_KEY);
export const todoListObj = JSON.parse(t) || [];

export const saveTodoObj = () => {
  localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoListObj));
};
