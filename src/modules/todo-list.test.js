/*
 * @jest-environment jsdom
 */

// Arrange
import { todoListObj } from './local-storage.js';
import { TestTodo, Todo, TodoList } from './todo-list.js';

// Act

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

    TestTodo.clearTodos();
  });

  test('Remove a todo', () => {
    TestTodo.addTodo('todo 1');
    TestTodo.addTodo('todo 2');

    const firstIndex = 1;
    TodoList.remove(firstIndex);

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
