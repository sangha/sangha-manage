import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return hash({
      term: params.term,
      search: this.store.findRecord('search', params.term)
    });
  },

  setupController(controller, models) {
    controller.set('search', models.search);
    controller.set('term', models.term);
  }
});
