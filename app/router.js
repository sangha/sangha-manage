import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('projects', function () {
    this.route('all');

    this.route('settings', {
      path: '/*project_url/settings'
    });

    this.route('show', {
      path: '/:project_url'
    });
  });
});

export default Router;
