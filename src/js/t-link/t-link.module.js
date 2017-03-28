import angular from 'angular';
import tLinkController from './t-link.controller';
import tLinkTemplate from './t-link.template.html';

export default angular
  .module('tLink', [])
  .component('tLink', {
    template: tLinkTemplate,
    bindings: {
      active: '<',
      filter: '<',
      onClick: '&',
    },
    controller: tLinkController,
  });
