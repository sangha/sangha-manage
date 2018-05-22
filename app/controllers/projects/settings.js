import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  dialogNotValid: computed('project.name', 'project.summary', 'project.website', 'project.license', 'project.repository', function () {
    var p = this.project;
    return p.get('name').length == 0 || p.get('summary').length == 0 ||
      p.get('website').length == 0 || p.get('license').length == 0 ||
      p.get('repository').length == 0;
  }),

  actions: {
    saveProject() {
      var p = this.project;

      p.save().then(
        (p) => {
          this.transitionToRoute('projects.show', p.id);
        },
        error => {
          p.rollbackAttributes();
          alert(`Failed updating project: ` + error.errors[0].detail);
        }
      );
    }
  }
});
