import angular from 'angular';
import 'angular-mocks';
import TTodoListContainerController from '../../../src/js/t-todo-list-container/t-todo-list-container.controller';

const { inject } = angular.mock;

describe('t-todo-list-container controller:', () => {
  let controller;
  let tTodos;
  let tVisibilityFilter;
  let $q;
  let $scope;
  let tTodosDefer;
  let tVisibilityFilterDefer;

  beforeEach(inject((_$rootScope_, _$q_) => {
    let $q = _$q_;
    tTodosDefer = $q.defer();
    tVisibilityFilterDefer = $q.defer();
    tTodos = {
      init: () => tTodosDefer.promise,
      get: jasmine.createSpy('get'),
      toggle: jasmine.createSpy('toggle'),
      delete: jasmine.createSpy('delete'),
    };
    tVisibilityFilter = {
      init: () => tVisibilityFilterDefer.promise,
    };
    $scope = _$rootScope_.$new();
    controller = new TTodoListContainerController(
      tTodos,
      tVisibilityFilter,
      $q,
      $scope,
    );
    tTodosDefer.resolve([
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
    ]);
  }));

  it('should return 2 todos when visibility filter is ALL', () => {
    tVisibilityFilterDefer.resolve('ALL');
    $scope.$digest();
    expect(controller.filteredTodos.length).toEqual(2);
  });

  it('should return todo 2 when visibility filter is COMPLETED', () => {
    tVisibilityFilterDefer.resolve('COMPLETED');
    $scope.$digest();
    expect(controller.filteredTodos.length).toEqual(1);
    expect(controller.filteredTodos[0].id).toEqual(2);
  });

  it('should return todo 1 when visibility filter is ACTIVE', () => {
    tVisibilityFilterDefer.resolve('ACTIVE');
    $scope.$digest();
    expect(controller.filteredTodos.length).toEqual(1);
    expect(controller.filteredTodos[0].id).toEqual(1);
  });

  it('should call tTodos toggle once when onTodoClick is called', () => {
    controller.onTodoClick();
    expect(tTodos.toggle).toHaveBeenCalledTimes(1);
  });

  it('should call tTodos delete once when onTodoDelete is called', () => {
    controller.onTodoDelete();
    expect(tTodos.delete).toHaveBeenCalledTimes(1);
  });
});
