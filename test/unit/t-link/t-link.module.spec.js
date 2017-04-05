import angular from 'angular';
import 'angular-mocks';
import '../../../src/js/t-link/t-link.module';

const { module, inject } = angular.mock;

describe('t-link module', () => {
  let $compile;
  let $scope;
  let element;

  beforeEach(module('tLink'));
  beforeEach(inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $scope.$ctrl = {
      active: false,
      filter: 'ALL',
      onClick: jasmine.createSpy('onClick'),
    };
    element = $compile(
      `<t-link
        active="$ctrl.active"
        filter="$ctrl.filter"
        on-click="$ctrl.onClick()"
      >
      </t-link>`,
    )($scope)[0];
    $scope.$digest();
  }));

  it('should replace the element with anchor when active is false', () => {
    expect(element.querySelector('a').innerHTML.trim()).toEqual('ALL');
    expect(element.querySelector('span')).toBeNull();
  });

  it('should replace the element with span when active is true', () => {
    $scope.$ctrl.active = true;
    $scope.$digest();
    expect(element.querySelector('span').innerHTML.trim()).toEqual('ALL');
    expect(element.querySelector('a')).toBeNull();
  });

  it('should call onClick once when anchor is clicked', () => {
    element.querySelector('a').click();
    expect($scope.$ctrl.onClick).toHaveBeenCalledTimes(1);
  });
});
