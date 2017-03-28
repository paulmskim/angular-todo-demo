import angular from 'angular';
import tHeaderTemplate from './t-header.template.html';

export default angular
  .module('tHeader', [])
  .component('tHeader', {
    template: tHeaderTemplate,
  });
