import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | search/term', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:search/term');
    assert.ok(route);
  });
});
