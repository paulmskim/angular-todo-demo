export default class tTodosService {
  constructor(tTodosResource, $q, $rootScope) {
    this.tTodosResource = tTodosResource;
    this.q = $q;
    this.rootScope = $rootScope;
  }

  init() {
    const promise = this.getTodos();
    promise.then(res => this.set(res));
    return promise;
  }

  getTodos() {
    const defer = this.q.defer();
    this.tTodosResource.query(res => defer.resolve(res));
    return defer.promise;
  }

  addTodo(text) {
    const defer = this.q.defer();
    this.tTodosResource.save({
      text,
      completed: false,
    }, res => defer.resolve(res));
    return defer.promise;
  }

  toggleTodo(id) {
    const defer = this.q.defer();
    const todo = this.todos.find(t => t.id === id);
    this.tTodosResource.update({ id }, {
      ...todo,
      completed: !todo.completed,
    }, res => defer.resolve(res));
    return defer.promise;
  }

  deleteTodo(id) {
    const defer = this.q.defer();
    this.tTodosResource.delete({ id }, res => defer.resolve(res));
    return defer.promise;
  }

  get() {
    return this.todos;
  }

  set(todos) {
    this.todos = todos;
  }

  add(text) {
    this.addTodo(text).then((res) => {
      this.set([
        ...this.todos,
        res,
      ]);
      this.broadcast(res);
    });
  }

  toggle(id) {
    this.toggleTodo(id).then((res) => {
      this.set(this.todos.map((todo) => {
        if (todo.id !== res.id) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }));
      this.broadcast(res);
    });
  }

  delete(id) {
    this.deleteTodo(id).then((res) => {
      this.set(this.todos.filter(todo => todo.id !== id));
      this.broadcast(res);
    });
  }

  broadcast(res) {
    this.rootScope.$broadcast('todos', res);
  }
}
