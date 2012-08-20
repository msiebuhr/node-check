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
        '.has(bar) fails': function () {
            assert.isFalse(
                check({foo: 'bar'}).has('bar').ok()
            );
        },
        '.testFunction(bar, function () {}) fails': function () {
            assert.isFalse(
                check({foo: 'bar'})
                    .testFunction('bar', function () {})
                    .ok()
            );
        },
        '.testFunction(foo, function () {return;}) succeeds': function () {
            assert.isTrue(
                check({foo: 'bar'})
                    .testFunction('foo', function () { return; })
                    .ok()
            );
        },
        '.testFunction(foo, function (k,v){return v==="bar"?undefined:"err!"}) succeeds': function () {
            assert.isTrue(
                check({foo: 'bar'})
                    .testFunction('foo', function (k, v) {
                        return v === "bar" ? undefined : "err";
                    })
                    .ok()
            );
        },
        '.testFunction(foo, function (k,v){return v!=="bar"?undefined:"err!"}) fails': function () {
            var res = check({foo: 'bar'})
                .testFunction('foo', function (k, v) {
                    return v !== "bar" ? undefined : "err";
                })
                .errors();

            assert.equal(res.length, 1);
            assert.deepEqual(res, ["err"]);
        },
        '.testFunction(foo, function (){throw new Error("foo")}) fails': function () {
            var res = check({foo: 'bar'})
                .testFunction('foo', function (k, v) {
                    throw new Error("foo");
                })
                .errors();

            assert.equal(res.length, 1);
            assert.deepEqual(res, ["foo"]);
        }

    },
    '{a: {b: c}}': {
        '.has(a.b) is OK': function () {
            assert.isTrue(check({a: {b: 'c'}}).has('a.b').ok());
        },
        '.has(a.c) fails': function () {
            assert.isFalse(check({a: {b: 'c'}}).has('a.c').ok());
        }
    }
})['export'](module);

