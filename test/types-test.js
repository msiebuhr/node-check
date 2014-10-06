var vows = require('vows'),
    assert = require('assert'),
    check = require('../lib');

var data = {
    _arguments: arguments,
    _array: [1, 2, 3],
    _boolean: false,
    _date: new Date(),
    _float: 1.1,
    _function: function () {},
    _int: 1,
    _object: {foo: 'bar'},
    _regexp: /.*/,
    _string: "string"
};

vows.describe("Type checks").addBatch({
    'hasObject()': {
        'hasObject(<object>) is OK': function () {
            assert.isTrue(check(data).hasObject('_object').ok());
        },
        'hasObject(<integer>) fails': function () {
            assert.isFalse(check(data).hasObject('_int').ok());
        }
    },
    'hasArray() + message contents': {
        'hasArray(<array>) is OK': function () {
            var res = check(data).hasArray('_array').errors();
            assert.deepEqual(res, []);
        },
        'hasArray(<integer>) fails': function () {
            var res = check(data).hasArray('_int').errors();
            assert.deepEqual(res, ["Key '_int' should be an array."]);
        },
        'hasArray(missing_key) fails': function () {
            var res = check(data).hasArray('missing_key').errors();
            assert.deepEqual(res, ["Missing key 'missing_key'."]);
        }

    },
    'hasString()': {
        'hasString(<string>) is OK': function () {
            assert.isTrue(check(data).hasString('_string').ok());
        },
        'hasString(<integer>) fails': function () {
            assert.isFalse(check(data).hasString('_int').ok());
        }
    },
    'hasArguments()': {
        'hasArguments(<int>) fails': function () {
            assert.isFalse(check(data).hasArguments('_int').ok());
        },
        'hasArguments(<arguments>) is OK': function () {
            assert.isTrue(check(data).hasArguments('_arguments').ok());
        }
    },
    'hasFunction()': {
        'hasFunction(<string>) fails': function () {
            assert.isFalse(check(data).hasFunction('_string').ok());
        },
        'isfunction(<function>) is OK': function () {
            assert.isTrue(check(data).hasFunction('_function').ok());
        }
    },
    'hasNumber()': {
        'hasNumber(<string>) fails': function () {
            assert.isFalse(check(data).hasNumber('_string').ok());
        },
        'hasNumber(<int>) is OK': function () {
            assert.isTrue(check(data).hasNumber('_int').ok());
        },
        'hasNumber(<float>) is OK': function () {
            assert.isTrue(check(data).hasNumber('_float').ok());
        }
    },
    'hasDate()': {
        'hasDate(<string>) fails': function () {
            assert.isFalse(check(data).hasDate('_string').ok());
        },
        'hasDate(<date>) is OK': function () {
            assert.isTrue(check(data).hasDate('_date').ok());
        }
    },
    'hasBoolean()': {
        'hasBoolean(<string>) fails': function () {
            assert.isFalse(check(data).hasBoolean('_string').ok());
        },
        'hasBoolean(<boolean>) is OK': function () {
            assert.isTrue(check(data).hasBoolean('_boolean').ok());
        }
    },
    'hasRegExp()': {
        'hasRegExp(<string>) fails': function () {
            assert.isFalse(check(data).hasRegExp('_string').ok());
        },
        'hasRegExp(<regexp>) is OK': function () {
            assert.isTrue(check(data).hasRegExp('_regexp').ok());
        }
    }
})['export'](module);

