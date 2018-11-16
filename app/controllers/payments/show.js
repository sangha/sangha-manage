import {
  computed
} from '@ember/object';
import Controller from '@ember/controller';
import {
  inject as service
} from '@ember/service';

export default Controller.extend({
  notifications: service('notification-manager'),

  init() {
    this._super(...arguments);
    this.searchList = [];
  },

  budgetRatios: computed('payment.code.budgets', function () {
    var data = [];
    var rs = this.payment.get('code').get('ratios');
    var amount = this.payment.get('amount') * 0.01;

    this.payment.get('code').get('budgets').forEach(function (b, idx) {
      var pamount = amount * (rs[idx] * 0.01);
      var pfee = pamount * (b.get('project').get('processing_cut') * 0.01);

      if (pamount < 0) {
        pfee = 0;
      }

      data.push({
        project: b.get('project').get('name'),
        budget: b.get('name'),
        ratio: rs[idx],
        grossamount: pamount,
        amount: pamount - pfee,
        fee: pfee,
        cut: b.get('project').get('processing_cut')
      });
    });

    return data;
  }),

  noCode: computed('payment.code.token', function () {
    return this.payment.get('code') == null || this.payment.get('code').get('token') == undefined;
  }),

  noSelectedBudget: computed('selectedBudget', function () {
    return this.selectedBudget == null || this.selectedBudget.code == undefined;
  }),

  prevBudget: "",
  selectedBudget: null,
  disableCodeEdit: true,
  checking: false,

  actions: {
    editCode() {
      this.set('prevBudget', this.payment.get('code').get('token'));
      this.set('disableCodeEdit', false);
    },

    cancelEditCode() {
      this.set('selectedBudget', this.prevBudget);
      this.set('disableCodeEdit', true);
    },

    changeCode() {
      this.set('disableCodeEdit', true);
      this.set('checking', true);

      var payment = this.payment;
      var budget = this.selectedBudget;
      this.store.findRecord('code', budget.code).then(
        (code) => {
          payment.set('code', code);
          this.set('selectedBudget', code.get('token'));
          this.set('checking', false);
        },
        error => {
          alert("Couldn't find code " + budget.code + ": " + error);
          this.set('checking', false);
        }
      );
    },

    searchBudgets(term) {
      this.store.query('code', {
        search: term
      }).then(
        codes => {
          var ps = [];
          codes.forEach(function (p) {
            var s = "";
            p.get('budgets').forEach(function (b) {
              s += b.get('project').get('name') + " - " + b.get('name') + ", ";
            });
            ps.push({
              name: s.substring(0, s.length - 2) + " (" + p.get('token') + ")",
              code: p.get('token')
            });
          });
          this.set('searchList', ps);
        },
        error => {
          alert("Couldn't find budget (by name or code): " + term + ": " + error);
        }
      )
    },

    approvePayment() {
      var payment = this.payment;
      payment.set('pending', false);

      payment.save().then(
        (payment) => {
          if (payment.get('amount') > 0) {
            this.transitionToRoute('payments.pending');
          } else {
            this.transitionToRoute('payments.outgoing');
          }
          this.notifications.show('Approved payment');
        },
        error => {
          payment.rollbackAttributes();
          alert(`Failed updating payment: ` + error.errors[0].detail);
        }
      );
    }
  }
});
