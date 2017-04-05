import angular from 'angular';
import 'angular-mocks';
import '../../../src/js/t-header/t-header.module';

const { module, inject } = angular.mock;

describe('t-header module:', () => {
  let $compile;
  let $scope;
  let element;

  beforeEach(module('tHeader'));
  beforeEach(inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    element = $compile('<t-header></t-header>')($scope)[0];
    $scope.$digest();
  }));

  it('should replace the element with the appropriate content', () => {
    expect(element.querySelector('.title').innerHTML.trim())
      .toEqual('Angular Todo Demo');
  });
});
