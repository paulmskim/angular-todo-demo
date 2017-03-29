export default class tAddTodoContainerController {
  constructor(tTodos) {
    this.tTodos = tTodos;
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
