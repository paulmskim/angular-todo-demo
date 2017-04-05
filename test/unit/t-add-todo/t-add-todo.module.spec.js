import angular from 'angular';
import 'angular-mocks';
import '../../../src/js/t-add-todo/t-add-todo.module';

const { module, inject } = angular.mock;

describe('t-add-todo module:', () => {
  let $compile;
  let $scope;
  let element;

  beforeEach(module('tAddTodo'));
  beforeEach(inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $scope.$ctrl = {
      input: '',
      onSubmit: jasmine.createSpy('onSubmit'),
    };
    element = $compile(
      `<t-add-todo
        input="$ctrl.input"
        on-submit="$ctrl.onSubmit()"
      >
      </t-add-todo>`,
    )($scope)[0];
    $scope.$digest();
  }));

  it('should replace the element with the appropriate content', () => {
    expect(element.querySelector('.add-todo-button').innerHTML.trim()).toEqual('+');
  });

  it('should update the input value when input changes', () => {
    let inputText = element.querySelector('.add-todo-input').value;
    expect(inputText).toEqual('');
    $scope.$ctrl.input = 'updated';
    $scope.$digest();
    inputText = element.querySelector('.add-todo-input').value;
    expect(inputText).toEqual('updated');
  });

  it('should call onSubmit once when add todo button is clicked', () => {
    element.querySelector('.add-todo-button').click();
    expect($scope.$ctrl.onSubmit).toHaveBeenCalledTimes(1);
  });
});
