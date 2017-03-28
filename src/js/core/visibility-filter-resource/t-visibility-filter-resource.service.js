export default class tVisibilityFilterResourceService {
  constructor($resource) {
    return $resource('/api/visibilityFilter', {}, {
      update: {
        method: 'PUT',
      },
    });
  }
}
