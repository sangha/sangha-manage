import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    goToPayment(item) {
      this.transitionToRoute('payments.show', item._internalModel.id);
    }
  }
});
