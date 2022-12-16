export const todoListObj = JSON.parse(localStorage.getItem('todo.list')) || [];

export function Todo(description, completed = false) {
  this.index = todoListObj.length + 1;
  this.description = description;
  this.completed = completed;
}

export class TodoList {
  static add(todo) {
    todoListObj.push(todo);
  }

  static remove(index) {
    todoListObj.splice(index - 1, 1);
    TodoList.sort();
  }

  static update(index, description) {
    const todoItem = todoListObj[index - 1];
    if (!todoItem) return;
    todoItem.description = description;
  }

  static sort() {
    todoListObj.forEach((todo, index) => {
      todo.index = index + 1;
    });
  }
}
