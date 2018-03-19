import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.belongsTo('project', {
    inverse: null
  }),
  name: DS.attr('string'),
  description: DS.attr('string'),
  balance: DS.attr('number'),
  code: DS.attr('string')
});
