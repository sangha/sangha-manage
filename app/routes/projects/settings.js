import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return hash({
      project: this.store.findRecord('project', params.project_url)
    });
  },

  setupController(controller, models) {
    controller.set('project', models.project);
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.project.rollbackAttributes();
    }
  }
});
