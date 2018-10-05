import {
  computed
} from '@ember/object';
import Controller from '@ember/controller';
import {
  inject as service
} from '@ember/service';

export default Controller.extend({
  router: service(),
  currentRouteName: computed('router.currentRouteName', function () {
    return this.get('router.currentRouteName');
  }),

  selectedTab: 0,

  budgetChart: computed('budgets', function () {
    var data = [];

    this.budgets.forEach(function (b) {
      if (b.get('balance') != 0) {
        data.push({
          value: b.get('balance') / 100,
          label: b.get('name')
        });
      }
    });

    return data;
  }),

  historyChart: computed('statistics', function () {
    var data = [];

    var s = this.statistics[0];
    var pm = s.get('past_months');

    var dt = new Date();
    for (var i = pm.length - 1; i > 0; i--) {
      var ddt = new Date(dt.getFullYear(), dt.getMonth() - i + 1, 1);
      data.push({
        time: ddt,
        value: pm[i] / 100,
        label: 'Value'
      });
    }

    data.push({
      time: new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()),
      value: pm[0] / 100,
      label: 'Value'
    });

    return data;
  }),

  projectionChart: computed('statistics', function () {
    var data = [];

    var p = this.project;
    var s = this.statistics[0];
    var pm = s.get('past_months')

    var dt = new Date();
    for (let i = Math.min(12, pm.length - 1); i > 0; i--) {
      let ddt = new Date(dt.getFullYear(), dt.getMonth() - i + 1, 1);
      data.push({
        time: ddt,
        value: pm[i] / 100,
        label: 'Value'
      });
    }

    data.push({
      time: new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()),
      value: pm[0] / 100,
      label: 'Value'
    });
    data.push({
      time: new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()),
      value: pm[0] / 100,
      label: 'Projection'
    });

    for (let i = 0; i < 12; i++) {
      let ddt = new Date(dt.getFullYear(), dt.getMonth() + i + 1, 1);

      data.push({
        time: ddt,
        value: p.get('balance') / 100 + (s.get('monthly_change') * i) / 100,
        label: 'Projection'
      });
    }

    return data;
  }),

  actions: {
    goToBudget(item) {
      this.transitionToRoute('projects.budgets.show', item._internalModel.project.id, item._internalModel.id);
    }
  }
});
