import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | transactions/show', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:transactions/show');
    assert.ok(route);
  });
});
