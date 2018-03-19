import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  slug: DS.attr('string'),
  logo: DS.attr('string'),
  summary: DS.attr('string'),
  about: DS.attr('string'),
  license: DS.attr('string'),
  website: DS.attr('string'),
  repository: DS.attr('string'),
  balance: DS.attr('number'),
  processing_cut: DS.attr('number'),
  activated: DS.attr('boolean'),
  budget_root: DS.belongsTo('budget', {
    inverse: null
  })
});
