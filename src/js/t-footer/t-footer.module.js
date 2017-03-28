import angular from 'angular';
import '../t-link-container/t-link-container.module';
import tFooterTemplate from './t-footer.template.html';

export default angular
  .module('tFooter', [
    'tLinkContainer',
  ]).component('tFooter', {
    template: tFooterTemplate,
  });
