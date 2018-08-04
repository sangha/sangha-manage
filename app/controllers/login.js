import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service('session'),

  actions: {
    authenticate() {
      var credentials = this.getProperties('identification', 'password');
      this.session.authenticate('authenticator:custom', credentials).catch(
        ( /*reason*/ ) => {
          this.set('errorMessage', "Login failed. Check your credentials!");
        }
      );
    }
  }
});
