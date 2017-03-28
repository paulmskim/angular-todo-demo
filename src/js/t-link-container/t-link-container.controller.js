export default class tLinkContainerController {
  constructor(tVisibilityFilter, $q, $scope, $rootScope) {
    this.tVisibilityFilter = tVisibilityFilter;
    this.q = $q;
    this.rootScope = $rootScope;
    this.initVisibilityFilter();
    this.setVisibilityFilterChangeListener($scope);
  }

  initVisibilityFilter() {
    this.tVisibilityFilter.init().then(
      (res) => {
        this.setActive(res);
      },
    );
  }

  setVisibilityFilterChangeListener(scope) {
    scope.$on(
      'visibilityFilterChange',
      (event, data) => this.setActive(data),
    );
  }

  setActive(filter) {
    this.active = false;
    if (filter === this.filter) {
      this.active = true;
    }
  }

  onClick(event) {
    event.preventDefault();
    this.tVisibilityFilter.update(this.filter);
  }

  getVisibilityFilter() {
    return this.tVisibilityFilter.get();
  }

  $onChanges() {
    this.setActive(this.getVisibilityFilter());
  }
}
