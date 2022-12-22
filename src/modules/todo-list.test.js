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

const renderTodos = () => {
  todoListObj.forEach(({ index, description, completed }) => {
    const checked = completed ? 'checked' : '';
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.setAttribute('data-todo-id', index);

    li.innerHTML = `
      <input type="checkbox" name="completed" ${checked} />
      <input type="text" name="description" value="${description}">
      <ion-icon name="ellipsis-vertical-outline" class="move-btn"></ion-icon>
      <ion-icon name="trash-outline" class="delete-btn"></ion-icon>
    `;

    document.body.appendChild(li);
  });
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

    // test dom changes
    renderTodos();

    const todoEl = document.querySelector(`[data-todo-id="${todo.index}"]`);
    const todoDescription = todoEl.querySelector('input[name="description"');

    expect(todoDescription.getAttribute('value')).toBe(newDescription);

    // cleanup
    clearTodos();
    document.body.innerHTML = '';
  });

  test('Update completed status', () => {
    const todo1 = addTodo('todo 1', true);
    const todo2 = addTodo('todo 2');

    // we toggle completed states, so true becomes false
    TodoList.toggleCompleted(todo1.index);
    TodoList.toggleCompleted(todo2.index);

    expect(todo1.completed).toBe(false);
    expect(todo2.completed).toBe(true);

    // test dom changes
    renderTodos();

    const todoEl1 = document.querySelector(`[data-todo-id="${todo1.index}"]`);
    const todoEl2 = document.querySelector(`[data-todo-id="${todo2.index}"]`);

    const checkbox1 = todoEl1.querySelector('input[name="completed"]');
    const checkbox2 = todoEl2.querySelector('input[name="completed"]');

    expect(checkbox1.hasAttribute('checked')).toBe(false);
    expect(checkbox2.hasAttribute('checked')).toBe(true);

    // cleanup
    clearTodos();
    document.body.innerHTML = '';
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

    expect(todoListObj.filter((todo) => todo.completed === 0)).toHaveLength(0);

    // test dom changes
    renderTodos();

    const checkboxes = document.querySelectorAll('input[name="completed"]');
    const completedElems = Array.from(checkboxes).filter((elem) => elem.hasAttribute('completed'));
    expect(completedElems).toHaveLength(0);

    // cleanup
    clearTodos();
    document.body.innerHTML = '';
  });
});
