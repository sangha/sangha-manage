import Controller from '@ember/controller';

export default Controller.extend({
  projects: [],
  term: "",

  actions: {
    searchAction() {
      var searchTerm = this.getProperties('term');
      this.transitionToRoute('search.term', searchTerm.term);
    }
  }
});
