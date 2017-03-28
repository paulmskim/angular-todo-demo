export default class tLinkController {
  $onChanges() {
    this.linkClass = `footer-link footer-link-${this.filter.toLowerCase()}`;
    if (this.active) {
      this.linkClass += ' active';
    }
  }
}
