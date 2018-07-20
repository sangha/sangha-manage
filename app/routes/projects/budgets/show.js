import {
  hash
} from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return hash({
      budget: this.store.findRecord('budget', params.budget_url),
      transactions: this.store.query('transaction', {
        budget: params.budget_url
        // limit: 25
      })
    });
  },

  setupController(controller, models) {
    controller.set('budget', models.budget);
    controller.set('transactions', models.transactions.toArray());
  }
});
