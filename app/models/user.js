import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  about: DS.attr('string'),
  admin: DS.attr('boolean'),
  activated: DS.attr('boolean')
});
