import DS from 'ember-data';

export default DS.Model.extend({
  token: DS.attr('string'),
  budgets: DS.hasMany('budget', {
    inverse: null
  }),
  ratios: DS.attr()
});
