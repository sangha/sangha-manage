import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend( /*AuthenticatedRouteMixin, */ {
  model() {
    return hash({
      projects: this.store.query('project', {
        sort: ''
      })
    });
  },

  setupController(controller, models) {
    controller.set('projects', models.projects.toArray());
  }
})
