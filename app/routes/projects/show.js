import {
  hash
} from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return hash({
      project: this.store.findRecord('project', params.project_url),
      budgets: this.store.query('budget', {
        project: params.project_url
      }),
      transactions: this.store.query('transaction', {
        project: params.project_url,
        limit: 10
      })
    });
  },

  setupController(controller, models) {
    controller.set('project', models.project);
    controller.set('budgets', models.budgets.toArray());
    controller.set('transactions', models.transactions);
  }
});
