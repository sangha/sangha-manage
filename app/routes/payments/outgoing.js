import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return hash({
      payments: this.store.query('payment', {
        pending: true,
        direction: 'outgoing'
      })
    });
  },

  setupController(controller, models) {
    controller.set('payments', models.payments);
  }
})
