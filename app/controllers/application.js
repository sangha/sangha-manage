import {
  equal
} from '@ember/object/computed';
import Controller from '@ember/controller';
import {
  computed
} from '@ember/object';
import {
  inject as service
} from '@ember/service';

export default Controller.extend({
  session: service('session'),
  currentUser: service('current-user'),
  notifications: service('notification-manager'),

  actions: {
    invalidateSession() {
      this.store.unloadAll('payment');
      this.store.unloadAll('transaction');
      this.store.unloadAll('budget');
      this.store.unloadAll('project');
      this.session.invalidate();
    },

    closeToast() {
      this.notifications.hide();
    },

    toggleExpandedItem(value, ev) {
      if (this.expandedItem === value) {
        value = null;
      }
      this.set('expandedItem', value);
      ev.stopPropagation();
    }
  },

  expandedItem: computed('currentRouteName', function () {
    if (this.currentRouteName.substr(0, 8) === 'payments') {
      return 'payments';
    }
  }),

  paymentsExpanded: equal('expandedItem', 'payments'),
});
