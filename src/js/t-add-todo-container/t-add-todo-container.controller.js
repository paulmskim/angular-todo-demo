export default class tAddTodoContainerController {
  constructor(tTodos, $q, $rootScope) {
    this.tTodos = tTodos;
    this.q = $q;
    this.rootScope = $rootScope;
    this.input = '';
  }

  onSubmit() {
    if (!this.input.trim()) {
      return;
    }

    this.addTodo(this.input);
    this.input = '';
  }

  addTodo(text) {
    this.tTodos.add(text);
  }
}
