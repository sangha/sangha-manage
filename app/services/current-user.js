import { resolve } from 'rsvp';
import { isEmpty } from '@ember/utils';
import Service, { inject as service } from '@ember/service';

export default Service.extend({
  session: service('session'),
  store: service('store'),

  load() {
    let userId = this.get('session.data.authenticated.user_id');
    if (!isEmpty(userId)) {
      return this.store.findRecord('user', userId).then((user) => {
        this.set('user', user);
      });
    } else {
      return resolve();
    }
  }
});
