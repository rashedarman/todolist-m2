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

describe('Edit, Toggle status and Clear completed', () => {
  test('Edit a todo description', () => {
    const todo = addTodo('todo 1');
    const newDescription = 'new todo description';

    TodoList.update(todo.index, newDescription);

    expect(todo.description).toEqual(newDescription);

    clearTodos();
  });

  test('Update completed status', () => {
    const completedTodo = addTodo('todo 1', true);
    const pendingTodo = addTodo('todo 2');

    TodoList.toggleCompleted(completedTodo.index);
    TodoList.toggleCompleted(pendingTodo.index);

    expect(completedTodo.completed).toBe(false);
    expect(pendingTodo.completed).toBe(true);

    clearTodos();
  });

  test('Clear all completed', () => {
    addTodo('todo 1', true);
    addTodo('todo 2', true);
    addTodo('todo 3');

    // we take all the completed todos
    const completedTodos = todoListObj.filter((todo) => todo.completed);

    // loop through and remove each todo
    completedTodos.forEach((todo) => {
      const index = todoListObj.indexOf(todo);
      todoListObj.splice(index, 1);
    });

    // We're checking that there's no completed todos
    expect(todoListObj.filter((todo) => todo.completed === 0)).toHaveLength(0);
  });
});
