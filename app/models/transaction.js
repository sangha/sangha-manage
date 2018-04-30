import DS from 'ember-data';

export default DS.Model.extend({
  budget_id: DS.belongsTo('budget', {
    inverse: null
  }),
  from_budget_id: DS.belongsTo('budget', {
    inverse: null
  }),
  to_budget_id: DS.belongsTo('budget', {
    inverse: null
  }),
  amount: DS.attr('number'),
  created_at: DS.attr('isodate'),
  purpose: DS.attr('string'),
  payment_id: DS.belongsTo('payment', {
    inverse: null
  }),
  code: DS.attr('string')
});
