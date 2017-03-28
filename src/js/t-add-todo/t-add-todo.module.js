import angular from 'angular';
import tAddTodoTemplate from './t-add-todo.template.html';

export default angular
  .module('tAddTodo', [])
  .component('tAddTodo', {
    template: tAddTodoTemplate,
    bindings: {
      input: '=',
      onSubmit: '&',
    },
  });
