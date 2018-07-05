import { computed } from '@ember/object';
import Controller from '@ember/controller';
import {
  inject as service
} from '@ember/service';

export default Controller.extend({
  notifications: service('notification-manager'),

  budgetName: '',
  budgetDescription: '',

  dialogNotValid: computed('budgetName', 'budgetDescription', function () {
    return this.budgetName.length == 0 || this.budgetDescription.length == 0;
  }),

  actions: {
    goToBudget(item) {
      this.transitionToRoute('projects.budgets.show', this.project.id, item._internalModel.id);
    },

    openNewBudgetDialog() {
      this.set('dialogOrigin', null);
      this.set('showPromptDialog', true);
    },
    closePromptDialog(result) {
      if (result !== 'ok') {
        this.set('budgetName', '');
        this.set('budgetDescription', '');
        this.set('showPromptDialog', false);
        return;
      }

      const budget = this.store.createRecord('budget', {
        name: this.budgetName,
        description: this.budgetDescription,
        project: this.project
      });
      budget.save().then(
        (budget) => {
          this.set('budgetName', '');
          this.set('budgetDescription', '');
          this.set('showPromptDialog', false);
          this.budgets.pushObject(budget);

          this.notifications.show('Successfully created budget ' + budget.get('name'));
        },
        error => {
          budget.rollbackAttributes();
          alert(`Failed creating budget: ` + error.errors[0].detail);
        }
      );
    }
  }
});
