import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.attr('string'),
  monthly_change: DS.attr('number'),
  past_months: DS.attr()
});
