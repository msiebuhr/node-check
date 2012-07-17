var vows = require('vows'),
    assert = require('assert'),
    check = require('../lib');

vows.describe("Check").addBatch({
    '{foo: "bar"}': {
        '.has(foo) is OK': function () {
            assert.isTrue(
                check({foo: 'bar'}).has('foo').ok()
            );
        },
        'isString(foo) is OK': function () {
            assert.isTrue(check({foo: 'bar'}).isString('foo').ok());
        },
        'isArguments(foo) fails': function () {
            assert.isFalse(check({foo: 'bar'}).isArguments('foo').ok());
        },
        'isFunction(foo) fails': function () {
            assert.isFalse(check({foo: 'bar'}).isFunction('foo').ok());
        },
        'isNumber(foo) fails': function () {
            assert.isFalse(check({foo: 'bar'}).isNumber('foo').ok());
        },
        'isDate(foo) fails': function () {
            assert.isFalse(check({foo: 'bar'}).isDate('foo').ok());
        },
        'isBoolean(foo) fails': function () {
            assert.isFalse(check({foo: 'bar'}).isBoolean('foo').ok());
        },
        'isRegExp(foo) fails': function () {
            assert.isFalse(check({foo: 'bar'}).isRegExp('foo').ok());
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

