import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('login');

  this.route('projects', function () {
    this.route('all');

    this.route('stats', {
      path: '/:project_url/stats'
    });

    this.route('budgets', {
      path: '/:project_url/budgets'
    }, function () {
      this.route('show', {
        path: '/*budget_url'
      });
    });

    this.route('settings', {
      path: '/*project_url/settings'
    });

    this.route('show', {
      path: '/:project_url'
    });
  });

  this.route('payments', function () {
    this.route('pending');
    this.route('outgoing');
  });
});

export default Router;
