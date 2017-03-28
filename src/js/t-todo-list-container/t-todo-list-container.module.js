import angular from 'angular';
import '../t-todo-list/t-todo-list.module';
import '../core/todos/t-todos.module';
import tTodoListContainerTemplate from './t-todo-list-container.template.html';
import tTodoListContainerController from './t-todo-list-container.controller';

export default angular
  .module('tTodoListContainer', [
    'tTodoList',
    'core.tTodos',
  ]).component('tTodoListContainer', {
    template: tTodoListContainerTemplate,
    controller: [
      'tTodos',
      'tVisibilityFilter',
      '$q',
      '$scope',
      tTodoListContainerController,
    ],
  });
