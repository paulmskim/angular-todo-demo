import angular from 'angular';
import '../t-todo/t-todo.module';
import tTodoListTemplate from './t-todo-list.template.html';

export default angular
  .module('tTodoList', [
    'tTodo',
  ]).component('tTodoList', {
    template: tTodoListTemplate,
    bindings: {
      todos: '<',
      onTodoClick: '&',
      onTodoDelete: '&',
    },
  });
