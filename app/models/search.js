import DS from 'ember-data';

export default DS.Model.extend({
  projects: DS.hasMany('project', {
    inverse: null
  }),
  budgets: DS.hasMany('budget', {
    inverse: null
  }),
  payments: DS.hasMany('payment', {
    inverse: null
  })
});
