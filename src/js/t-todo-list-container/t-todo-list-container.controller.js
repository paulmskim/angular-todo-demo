export default class tTodoListContainerController {
  constructor(tTodos, tVisibilityFilter, $q, $scope) {
    this.tTodos = tTodos;
    this.tVisibilityFilter = tVisibilityFilter;
    this.q = $q;
    this.initTodoList();
    this.setListeners($scope);
  }

  initTodoList() {
    this.q.all([
      this.tTodos.init(),
      this.tVisibilityFilter.init(),
    ]).then((data) => {
      this.allTodos = data[0];
      this.visibilityFilter = data[1];
      this.filteredTodos = tTodoListContainerController.getFilteredTodos(
        this.allTodos,
        this.visibilityFilter,
      );
    });
  }

  static getFilteredTodos(todos, filter) {
    switch (filter) {
      case 'ALL':
        return todos;
      case 'COMPLETED':
        return todos.filter(todo => todo.completed);
      case 'ACTIVE':
        return todos.filter(todo => !todo.completed);
      default:
        throw new Error(`Unknown filter: ${filter}.`);
    }
  }

  setListeners(scope) {
    this.setTodosListener(scope);
    this.setVisibilityFilterChangeListener(scope);
  }

  setTodosListener(scope) {
    scope.$on(
      'todos',
      () => {
        this.allTodos = this.tTodos.get();
        this.filteredTodos = tTodoListContainerController.getFilteredTodos(
          this.allTodos,
          this.visibilityFilter,
        );
      },
    );
  }

  setVisibilityFilterChangeListener(scope) {
    scope.$on(
      'visibilityFilterChange',
      (event, data) => {
        this.setVisibilityFilter(data);
        this.filteredTodos = tTodoListContainerController.getFilteredTodos(
          this.allTodos,
          this.visibilityFilter,
        );
      },
    );
  }

  setVisibilityFilter(filter) {
    this.visibilityFilter = filter;
  }

  onTodoClick(id) {
    this.tTodos.toggle(id);
  }

  onTodoDelete(id) {
    this.tTodos.delete(id);
  }
}
