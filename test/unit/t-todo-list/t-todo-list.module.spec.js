import angular from 'angular';
import 'angular-mocks';
import '../../../src/js/t-todo-list/t-todo-list.module';

const { module, inject } = angular.mock;

describe('t-todo-list module:', () => {
  let $compile;
  let $scope;
  let element;

  beforeEach(module('tTodoList'));
  beforeEach(inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $scope.$ctrl = {
      todos: [
        {
          id: 1,
          text: 'test text 1',
          completed: false,
        },
        {
          id: 2,
          text: 'test text 2',
          completed: true,
        },
      ],
      onTodoClick: jasmine.createSpy('onTodoClick'),
      onTodoDelete: jasmine.createSpy('onTodoDelete'),
    };
    element = $compile(
      `<t-todo-list
        todos="$ctrl.todos"
        on-todo-click="$ctrl.onTodoClick(id)"
        on-todo-delete="$ctrl.onTodoDelete(id)"
      >
      </t-todo-list>`,
    )($scope)[0];
    $scope.$digest();
  }));

  it('should replace the element with a list of 2 todos', () => {
    expect(element.getElementsByClassName('todo').length).toEqual(2);
  });

  it('should replace the element with provided todo texts', () => {
    expect(element.querySelector('.todo-text-1').innerHTML.trim()).toEqual('test text 1');
    expect(element.querySelector('.todo-text-2').innerHTML.trim()).toEqual('test text 2');
  });

  it('should have todo-done class if completed is true', () => {
    expect(element.querySelector('.todo-text-1').classList.contains('todo-done')).toBe(false);
    expect(element.querySelector('.todo-text-2').classList.contains('todo-done')).toBe(true);
  });

  it('should call onTodoClick when todo text is clicked', () => {
    element.querySelector('.todo-text-1').click();
    expect($scope.$ctrl.onTodoClick).toHaveBeenCalledTimes(1);
    element.querySelector('.todo-text-2').click();
    expect($scope.$ctrl.onTodoClick).toHaveBeenCalledTimes(2);
  });

  it('should call onTodoDelete when todo delete is clicked', () => {
    element.querySelector('.todo-delete-1').click();
    expect($scope.$ctrl.onTodoDelete).toHaveBeenCalledTimes(1);
    element.querySelector('.todo-delete-2').click();
    expect($scope.$ctrl.onTodoDelete).toHaveBeenCalledTimes(2);
  });
});
