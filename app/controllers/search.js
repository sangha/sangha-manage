import Controller from '@ember/controller';

export default Controller.extend({
  term: "",

  actions: {
    searchAction() {
      var searchTerm = this.getProperties('term');
      this.transitionToRoute('search.term', searchTerm.term);
    }
  }
});
