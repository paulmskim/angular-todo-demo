import angular from 'angular';
import './core/core.module';
import './t-header/t-header.module';
import './t-add-todo-container/t-add-todo-container.module';
import './t-todo-list-container/t-todo-list-container.module';
import './t-footer/t-footer.module';

angular.module('todoApp', [
  'core',
  'tHeader',
  'tAddTodoContainer',
  'tTodoListContainer',
  'tFooter',
]);
