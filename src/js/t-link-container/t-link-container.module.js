import angular from 'angular';
import '../core/visibility-filter/t-visibility-filter.module';
import '../t-link/t-link.module';
import tLinkContainerTemplate from './t-link-container.template.html';
import tLinkContainerController from './t-link-container.controller';

export default angular
  .module('tLinkContainer', [
    'core.tVisibilityFilter',
    'tLink',
  ]).component('tLinkContainer', {
    template: tLinkContainerTemplate,
    bindings: {
      filter: '@',
    },
    controller: [
      'tVisibilityFilter',
      '$scope',
      tLinkContainerController,
    ],
  });
