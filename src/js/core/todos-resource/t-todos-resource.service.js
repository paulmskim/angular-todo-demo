export default class tTodosResourceService {
  constructor($resource) {
    return $resource('/api/todos/:id', {}, {
      update: {
        method: 'PUT',
      },
    });
  }
}
