import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  session: service('session'),
  currentUser: service(),

  beforeModel() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser().catch(() => this.session.invalidate());
  },

  sessionInvalidated() {
    if (this.get('session.skipRedirectOnInvalidation')) {
      this.set('session.skipRedirectOnInvalidation', false);
    } else {
      this._super(...arguments);
    }
  },

  _loadCurrentUser() {
    return this.currentUser.load();
  }
});
