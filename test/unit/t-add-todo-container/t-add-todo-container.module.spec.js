import angular from 'angular';
import 'angular-mocks';
import '../../../src/js/t-add-todo-container/t-add-todo-container.module';

const { module, inject } = angular.mock;

describe('t-add-todo-container module:', () => {
  let $compile;
  let $scope;
  let element;

  beforeEach(module('tAddTodoContainer'));
  beforeEach(inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    element = $compile(
      '<t-add-todo-container></t-add-todo-container>',
    )($scope)[0];
    $scope.$digest();
  }));

  it('should replace the element with the appropriate content', () => {
    expect(element.querySelector('.add-todo-button').innerHTML.trim())
      .toEqual('+');
  });
});
