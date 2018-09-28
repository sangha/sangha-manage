import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return hash({
      donor: params.id,
      payments: this.store.query('payment', {
        donor: params.id
      })
    });
  },

  setupController(controller, models) {
    controller.set('donor', models.donor);
    controller.set('payments', models.payments);
  }
});
