var vows = require('vows'),
    assert = require('assert'),
    check = require('../lib');

var data = { foo: 'bar' };

vows.describe("Finalizer checks").addBatch({
    '.ok()': {
        'Without errors': function () {
            var res = check(data).ok();
            assert.isBoolean(res);
            assert.isTrue(res);
        },
        'With error': function () {
            var res = check(data).has('bar').ok();
            assert.isBoolean(res);
            assert.isFalse(res);
        }
    },
    '.errors()': {
        'Without errors → []': function () {
            var res = check(data).errors();
            assert.isArray(res);
            assert.isEmpty(res);
        },
        'With missing key → ["Missing key \'…\'"]': function () {
            var res = check(data).has('bar').errors();
            assert.isArray(res);
            assert.lengthOf(res, 1);
            assert.equal(res[0], "Missing key 'bar'.");
        }
    },
    '.assert()': {
        'Without errors → []': function () {
            try {
                check(data).assert();
            } catch (e) {
                assert(false, ".assert() throws without any errors!");
            }
        },
        'Throws assertion with missing key': function () {
            try {
                check(data).has('bar').assert();
                assert(false, ".assert() doesn't throw when there are errors.");
            } catch (e) {
                assert.instanceOf(e, assert.AssertionError);
            }
        },
        'Throws2': {
            topic: function () {
                try {
                    check(data).has('bar').assert();
                } catch (e) {
                    return e;
                }
                return undefined;
            },
            'AssertionError': function (e) {
                assert.instanceOf(e, assert.AssertionError);
            },
            'Has stack trace': function (e) {
                assert.isString(e.stack);
            },
            'Top stack element refers to this file': function (e) {
                var atParts = e.stack
                    .split('\n')
                    .filter(function (line) {return line.match(/\s+at/);});
                assert(atParts[0].indexOf(__filename) !== -1)
            }
        }
    }
})['export'](module);

