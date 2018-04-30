import DS from 'ember-data';

export default DS.Model.extend({
  budget_id: DS.attr('string'),
  code: DS.belongsTo('code', {
    inverse: null
  }),
  amount: DS.attr('number'),
  created_at: DS.attr('isodate'),
  purpose: DS.attr('string'),
  remote_account: DS.attr('string'),
  remote_bank_id: DS.attr('string'),
  remote_name: DS.attr('string'),
  pending: DS.attr('boolean')
});
