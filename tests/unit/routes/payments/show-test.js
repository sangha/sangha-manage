import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | payments/show', function(hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:payments/show');
    assert.ok(route);
  });
});
