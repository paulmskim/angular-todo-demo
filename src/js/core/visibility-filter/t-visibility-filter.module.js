import angular from 'angular';
import '../visibility-filter-resource/t-visibility-filter-resource.module';
import tVisibilityFilterService from './t-visibility-filter.service';

export default angular
  .module('core.tVisibilityFilter', [
    'core.tVisibilityFilterResource',
  ]).service('tVisibilityFilter', [
    'tVisibilityFilterResource',
    '$q',
    '$rootScope',
    tVisibilityFilterService,
  ]);
