import TAddTodoController from '../../../src/js/t-add-todo-container/t-add-todo-container.controller';

describe('t-add-todo-container controller:', () => {
  let controller;

  beforeEach(() => {
    controller = new TAddTodoController({});
    controller.addTodo = jasmine.createSpy('addTodo');
  });

  it('should not call addTodo if onSubmit is called and input is empty', () => {
    expect(controller.input).toEqual('');
    controller.onSubmit();
    expect(controller.addTodo).not.toHaveBeenCalled();
  });

  it('should call addTodo once if onSubmit is called with non-empty input', () => {
    controller.input = 'not empty';
    controller.onSubmit();
    expect(controller.addTodo).toHaveBeenCalledTimes(1);
  });
});
