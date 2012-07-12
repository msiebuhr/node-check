var vows = require('vows'),
    assert = require('assert'),
    check = require('../lib');

vows.describe("Check").addBatch({
    '{foo: bar}': {
        '.has(foo) is OK': function () {
            assert.isTrue(
                check({foo: 'bar'}).has('foo').isOK()
            );
        },
        '.has(bar) fails': function () {
            assert.isFalse(
                check({foo: 'bar'}).has('bar').isOK()
            );
        }
    }
})['export'](module);

