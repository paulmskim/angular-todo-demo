import angular from 'angular';
import '../todos-resource/t-todos-resource.module';
import tTodosService from './t-todos.service';

export default angular
  .module('core.tTodos', [
    'core.tTodosResource',
  ]).service('tTodos', [
    'tTodosResource',
    '$q',
    '$rootScope',
    tTodosService,
  ]);
