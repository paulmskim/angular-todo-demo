export default class tVisibilityFilterService {
  constructor(tVisibilityFilterResource, $q, $rootScope) {
    this.tVisibilityFilterResource = tVisibilityFilterResource;
    this.q = $q;
    this.rootScope = $rootScope;
  }

  init() {
    const promise = this.getVisibilityFilter();
    promise.then((res) => {
      this.set(res);
    });
    return promise;
  }

  getVisibilityFilter() {
    const defer = this.q.defer();
    this.tVisibilityFilterResource.get(res => defer.resolve(res.filter));
    return defer.promise;
  }

  updateVisibilityFilter(filter) {
    const defer = this.q.defer();
    this.tVisibilityFilterResource.update({
      filter,
    }, res => defer.resolve(res.filter));
    return defer.promise;
  }

  get() {
    return this.visibilityFilter;
  }

  set(filter) {
    this.visibilityFilter = filter;
  }

  update(filter) {
    this.updateVisibilityFilter(filter).then((res) => {
      this.set(res);
      this.rootScope.$broadcast('visibilityFilterChange', res);
    });
  }
}
