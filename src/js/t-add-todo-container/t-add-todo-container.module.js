import angular from 'angular';
import '../core/todos/t-todos.module';
import '../t-add-todo/t-add-todo.module';
import tAddTodoContainerTemplate from './t-add-todo-container.template.html';
import tAddTodoContainerController from './t-add-todo-container.controller';

export default angular
  .module('tAddTodoContainer', [
    'core.tTodos',
    'tAddTodo',
  ]).component('tAddTodoContainer', {
    template: tAddTodoContainerTemplate,
    controller: [
      'tTodos',
      tAddTodoContainerController,
    ],
  });
