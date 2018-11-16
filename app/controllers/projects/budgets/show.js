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

  fromDate: null,
  toDate: null,
  filterTerm: "",

  transferAmount: null,
  transferPurpose: null,
  prevBudget: "",
  selectedBudget: null,

  noSelectedBudget: computed('selectedBudget', function () {
    return this.selectedBudget == null || this.selectedBudget.budget == undefined;
  }),
  noValidTransfer: computed('selectedBudget', 'transferAmount', 'transferPurpose', function () {
    return this.noSelectedBudget || !(this.transferAmount > 0) || this.transferPurpose.length == 0;
  }),

  filter() {
    this.store.query('transaction', {
      budget: this.get('budget.id'),
      search: this.filterTerm,
      from_date: this.fromDate,
      to_date: this.toDate,
    }).then(
      (transactions) => {
        this.set('transactions', transactions);
      }
    );
  },

  actions: {
    changeFromDate(d) {
      this.set('fromDate', d);
      this.filter();
    },
    changeToDate(d) {
      this.set('toDate', d);
      this.filter();
    },
    changeFilter(t) {
      this.set('filterTerm', t);
      this.filter();
    },

    searchBudgets(term) {
      this.store.query('budget', {
        search: ''
      }).then(
        budgets => {
          var ps = [];
          budgets.forEach(function (b) {
            ps.push({
              name: b.get('project').get('name') + " - " + b.get('name'),
              budget: b
            });
          });
          this.set('searchList', ps);
        },
        error => {
          alert("Couldn't find budget: " + term + ": " + error);
        }
      )
    },

    openTransferDialog() {
      this.set('showTransferDialog', true);
    },
    closeTransferDialog(result) {
      if (result !== 'ok') {
        this.set('showTransferDialog', false);
        return;
      }

      const transaction = this.store.createRecord('transaction', {
        budget_id: this.budget,
        to_budget_id: this.selectedBudget.budget,
        amount: this.transferAmount * 100,
        purpose: this.transferPurpose
      });
      transaction.save().then(
        (transaction) => {
          this.set('transferAmount', null);
          this.set('transferPurpose', null);
          this.set('selectedBudget', null);
          this.set('showTransferDialog', false);
          this.transactions.pushObject(transaction);

          this.notifications.show('Successfully transfered money');
        },
        error => {
          transaction.rollbackAttributes();
          alert(`Failed creating transaction: ` + error.errors[0].detail);
        }
      );
    },

    openDeleteBudgetDialog() {
      this.set('showDeleteDialog', true);
    },
    closeDeleteDialog(result) {
      if (result !== 'ok') {
        this.set('showDeleteDialog', false);
        return;
      }

      var p = this.budget.get('project');
      this.budget.deleteRecord();
      this.budget.save().then(
        (budget) => {
          this.set('showDeleteDialog', false);
          this.transitionToRoute('projects.show', p.get('id'));
          this.notifications.show('Deleted budget ' + budget.get('name'));
        },
        error => {
          this.budget.rollbackAttributes();
          alert(`Failed deleting budget: ` + error.errors[0].detail);
        }
      );
    }
  }
});
