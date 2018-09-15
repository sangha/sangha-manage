import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return hash({
      transaction: this.store.findRecord('transaction', params.id)
    });
  },

  setupController(controller, models) {
    controller.set('transaction', models.transaction);
  }
});
