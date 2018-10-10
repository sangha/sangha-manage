import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | payments/pending', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:payments/pending');
    assert.ok(controller);
  });
});
