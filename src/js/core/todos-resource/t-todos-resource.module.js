import angular from 'angular';
import 'angular-resource';
import tTodosResourceService from './t-todos-resource.service';

export default angular
  .module('core.tTodosResource', [
    'ngResource',
  ]).service('tTodosResource', [
    '$resource',
    tTodosResourceService,
  ]);
