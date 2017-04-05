import angular from 'angular';
import 'angular-mocks';
import '../../../src/js/t-todo/t-todo.module';

const { module, inject } = angular.mock;

describe('t-todo module:', () => {
  let $compile;
  let $scope;
  let element;

  beforeEach(module('tTodo'));
  beforeEach(inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $scope.$ctrl = {
      todoId: 1,
      text: 'test text',
      completed: false,
      onTodoClick: jasmine.createSpy('onTodoClick'),
      onTodoDelete: jasmine.createSpy('onTodoDelete'),
    };
    element = $compile(
      `<t-todo
        todo-id="$ctrl.todoId"
        text="$ctrl.text"
        completed="$ctrl.completed"
        on-todo-click="$ctrl.onTodoClick()"
        on-todo-delete="$ctrl.onTodoDelete()"
      >
      </t-link>`,
    )($scope)[0];
    $scope.$digest();
  }));

  it('should replace the element with the appropriate content', () => {
    expect(element.querySelector('.todo-text').innerHTML.trim()).toEqual('test text');
    expect(element.querySelector('.todo-delete').innerHTML.trim()).toEqual('×');
  });

  it('should call onTodoClick once when todo text is clicked', () => {
    element.querySelector('.todo-text').click();
    expect($scope.$ctrl.onTodoClick).toHaveBeenCalledTimes(1);
  });

  it('should call onTodoDelete once when todo delete is clicked', () => {
    element.querySelector('.todo-delete').click();
    expect($scope.$ctrl.onTodoDelete).toHaveBeenCalledTimes(1);
  });

  it('should have todo-done class when completed is true', () => {
    $scope.$ctrl.completed = true;
    $scope.$digest();
    expect(element.querySelector('.todo-text').classList.contains('todo-done')).toBe(true);
  });
});
