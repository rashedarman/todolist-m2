/*
 * @jest-environment jsdom
 */

// Arrange
import { todoListObj } from './local-storage.js';
import { Todo, TodoList } from './todo-list.js';

// Act

const clearTodos = () => {
  todoListObj.forEach((_, index) => {
    todoListObj.splice(index, 1);
  });
};

const addTodo = (description, completed = false) => {
  const todo = new Todo(description, completed);
  todoListObj.push(todo);
  return todo;
};

// Assert
describe('Add & Remove', () => {
  test('Add a todo', () => {
    const todo = new Todo('todo 1');
    TodoList.add(todo);
    expect(todoListObj).toContain(todo);

    todoListObj.forEach(() => {
      const li = document.createElement('li');
      li.classList.add('todo-item');
      document.body.appendChild(li);
    });

    const todoItems = document.querySelectorAll('.todo-item');
    expect(todoItems).toHaveLength(todoListObj.length);

    clearTodos();
  });

  test('Remove a todo', () => {
    const todo1 = addTodo('todo 1');
    addTodo('todo 2');

    TodoList.remove(todo1.index);

    document.body.innerHTML = '';

    todoListObj.forEach(() => {
      const li = document.createElement('li');
      li.classList.add('todo-item');
      document.body.appendChild(li);
    });

    const todoItems = document.querySelectorAll('.todo-item');
    expect(todoItems).toHaveLength(todoListObj.length);

    expect(todoListObj.length).toBe(1);
  });
});
