var vows = require('vows'),
    assert = require('assert'),
    check = require('../lib');

vows.describe("Litmus tests").addBatch({
    'check({database: "foo"})': {
        '.has(database) is OK': function () {
            assert.isTrue(check({database: 'foo'}).has('database').ok());
        },
        '.has(database.hostname) fails': function () {
            assert.isFalse(check({database: 'foo'}).has('database.hostname').ok());
        }
    }
})['export'](module);

