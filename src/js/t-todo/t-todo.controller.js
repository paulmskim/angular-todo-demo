export default class tTodoController {
  $onChanges() {
    this.todoClass = `todo todo-${this.todoId}`;
    this.todoTextClass = `todo-text todo-text-${this.todoId}`;
    this.todoDeleteClass = `todo-delete todo-delete-${this.todoId}`;
    if (this.completed) {
      this.todoTextClass += ' todo-done';
    }
  }
}
