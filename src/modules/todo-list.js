import { saveTodoObj, todoListObj } from './local-storage.js';

export function Todo(description, completed = false) {
  this.index = todoListObj.length + 1;
  this.description = description;
  this.completed = completed;
}

export class TodoList {
  static add(todo) {
    todoListObj.push(todo);
    saveTodoObj();
  }

  static remove(index) {
    todoListObj.splice(index - 1, 1);
    TodoList.updateIndex();
    saveTodoObj();
  }

  static update(index, description) {
    const todoItem = todoListObj[index - 1];
    if (!todoItem) return;
    todoItem.description = description;
    saveTodoObj();
  }

  static toggleCompleted(index) {
    const todoItem = todoListObj[index - 1];
    if (!todoItem) return;
    todoItem.completed = !todoItem.completed;
    saveTodoObj();
  }

  static updateIndex() {
    todoListObj.forEach((todo, index) => {
      todo.index = index + 1;
    });
    saveTodoObj();
  }

  static sortByIndex() {
    todoListObj.sort((todo1, todo2) => todo1.index - todo2.index);
  }
}
