import angular from 'angular';
import './todos/t-todos.module';
import './visibility-filter/t-visibility-filter.module';

export default angular.module('core', [
  'core.tTodos',
  'core.tVisibilityFilter',
]);
