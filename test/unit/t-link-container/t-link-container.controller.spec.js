import angular from 'angular';
import 'angular-mocks';
import TLinkContainerController from '../../../src/js/t-link-container/t-link-container.controller';

const { inject } = angular.mock;

describe('t-link-container controller:', () => {
  let controller;
  let tVisibilityFilter;
  let $scope;
  let defer;

  beforeEach(inject((_$rootScope_, _$q_) => {
    defer = _$q_.defer();
    tVisibilityFilter = {
      init: () => defer.promise,
      get: () => {},
      update: () => {},
    };
    $scope = _$rootScope_.$new();
    controller = new TLinkContainerController(tVisibilityFilter, $scope);
    controller.setActive = jasmine.createSpy('setActive');
    controller.getVisibilityFilter = jasmine.createSpy('getVisibilityFilter');
    defer.resolve(false);
    $scope.$digest();
  }));

  it('should call setActive once when initialized', () => {
    expect(controller.setActive).toHaveBeenCalledTimes(1);
  });

  it('should call setActive when $onChanges is called', () => {
    controller.$onChanges();
    expect(controller.setActive).toHaveBeenCalledTimes(2);
    expect(controller.getVisibilityFilter).toHaveBeenCalledTimes(1);
  });
});
