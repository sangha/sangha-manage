import Component from '@ember/component';

export default Component.extend({
  actions: {
    goToTransaction(item) {
      this.controller.transitionToRoute('transactions.show', item._internalModel.id);
    }
  }
});
