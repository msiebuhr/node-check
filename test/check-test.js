var vows = require('vows'),
    assert = require('assert'),
    check = require('../lib');

vows.describe("Check").addBatch({
    '{foo: bar}': {
        '.has(foo) is OK': function () {
            assert.isTrue(
                check({foo: 'bar'}).has('foo').ok()
            );
        },
        '.has(bar) fails': function () {
            assert.isFalse(
                check({foo: 'bar'}).has('bar').ok()
            );
        }
    },
    '{a: {b: c}}': {
        '.has(a.b) is OK': function () {
            assert.isTrue(check({a: {b: 'c'}}).has('a.b').ok());
        },
        '.has(a.c) fails': function () {
            assert.isTrue(check({a: {b: 'c'}}).has('a.c').ok());
        }
    }
})['export'](module);

