import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return hash({
      payment: this.store.findRecord('payment', params.id)
    });
  },

  setupController(controller, models) {
    controller.set('payment', models.payment);
  }
});
