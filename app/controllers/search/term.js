import Controller from '@ember/controller';

export default Controller.extend({
  term: "",

  actions: {
    goToProject(item) {
      this.transitionToRoute('projects.show', item._internalModel.id);
    },
    goToBudget(project, budget) {
      this.transitionToRoute('projects.budgets.show', project.get('id'), budget.get('id'));
    },
    goToPayment(item) {
      this.transitionToRoute('payments.show', item._internalModel.id);
    }
  }
});
