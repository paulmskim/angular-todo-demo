import angular from 'angular';
import tTodoTemplate from './t-todo.template.html';
import tTodoController from './t-todo.controller';

export default angular
  .module('tTodo', [])
  .component('tTodo', {
    template: tTodoTemplate,
    bindings: {
      todoId: '<',
      text: '<',
      completed: '<',
      onTodoClick: '&',
      onTodoDelete: '&',
    },
    controller: tTodoController,
  });
