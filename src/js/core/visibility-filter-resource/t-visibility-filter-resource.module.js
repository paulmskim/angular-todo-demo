import angular from 'angular';
import 'angular-resource';
import tVisibilityFilterResourceService from './t-visibility-filter-resource.service';

export default angular
  .module('core.tVisibilityFilterResource', [
    'ngResource',
  ]).service('tVisibilityFilterResource', [
    '$resource',
    tVisibilityFilterResourceService,
  ]);
