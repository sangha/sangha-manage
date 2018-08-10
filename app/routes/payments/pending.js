import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend( /*AuthenticatedRouteMixin, */ {
  model() {
    return hash({
      payments: this.store.query('payment', {
        pending: true,
        direction: 'incoming'
      })
    });
  },

  setupController(controller, models) {
    controller.set('payments', models.payments);
  }
})
