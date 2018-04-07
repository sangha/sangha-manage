import { computed } from '@ember/object';
import Controller from '@ember/controller';
import {
  inject as service
} from '@ember/service';

export default Controller.extend({
  notifications: service('notification-manager'),

  projectName: '',
  projectDescription: '',
  projectWebsite: '',
  projectLicense: '',
  projectRepository: '',

  dialogNotValid: computed('projectName', 'projectDescription', 'projectWebsite', 'projectLicense', 'projectRepository', function () {
    return this.projectName.length == 0 || this.projectDescription.length == 0 ||
      this.projectWebsite.length == 0 || this.projectLicense.length == 0 ||
      this.projectRepository.length == 0;
  }),

  resetDialog() {
    this.set('projectName', '');
    this.set('projectDescription', '');
    this.set('projectWebsite', '');
    this.set('projectLicense', '');
    this.set('projectRepository', '');
    this.set('showPromptDialog', false);
  },

  actions: {
    goToProject(item) {
      this.transitionToRoute('projects.show', item._internalModel.id);
    },

    openNewProjectDialog() {
      this.set('dialogOrigin', null);
      this.set('showPromptDialog', true);
    },
    closePromptDialog(result) {
      if (result !== 'ok') {
        this.resetDialog();
        return;
      }

      const project = this.store.createRecord('project', {
        name: this.projectName,
        summary: this.projectDescription,
        website: this.projectWebsite,
        license: this.projectLicense,
        repository: this.projectRepository
      });
      project.save().then(
        (project) => {
          this.resetDialog();
          this.projects.pushObject(project);

          this.notifications.show('Successfully created project ' + project.get('name'));
        },
        error => {
          project.rollbackAttributes();
          alert(`Failed creating project: ` + error.errors[0].detail);
        }
      );
    }
  }
});
