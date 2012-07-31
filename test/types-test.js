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
    'isObject()': {
        'isObject(<object>) is OK': function () {
            assert.isTrue(check(data).isObject('_object').ok());
        },
        'isObject(<integer>) fails': function () {
            assert.isFalse(check(data).isObject('_int').ok());
        }
    },
    'isArray() + message contents': {
        'isArray(<array>) is OK': function () {
            var res = check(data).isArray('_array').errors();
            assert.deepEqual(res, []);
        },
        'isArray(<integer>) fails': function () {
            var res = check(data).isArray('_int').errors();
            assert.deepEqual(res, ["config error: Key '_int' should be an array."]);
        },
        'isArray(missing_key) fails': function () {
            var res = check(data).isArray('missing_key').errors();
            assert.deepEqual(res, ["config error: Missing key 'missing_key'."]);
        }

    },
    'isString()': {
        'isString(<string>) is OK': function () {
            assert.isTrue(check(data).isString('_string').ok());
        },
        'isString(<integer>) fails': function () {
            assert.isFalse(check(data).isString('_int').ok());
        }
    },
    'isArguments()': {
        'isArguments(<int>) fails': function () {
            assert.isFalse(check(data).isArguments('_int').ok());
        },
        'isArguments(<arguments>) is OK': function () {
            assert.isTrue(check(data).isArguments('_arguments').ok());
        }
    },
    'isFunction()': {
        'isFunction(<string>) fails': function () {
            assert.isFalse(check(data).isFunction('_string').ok());
        },
        'isfunction(<function>) is OK': function () {
            assert.isTrue(check(data).isFunction('_function').ok());
        }
    },
    'isNumber()': {
        'isNumber(<string>) fails': function () {
            assert.isFalse(check(data).isNumber('_string').ok());
        },
        'isNumber(<int>) is OK': function () {
            assert.isTrue(check(data).isNumber('_int').ok());
        },
        'isNumber(<float>) is OK': function () {
            assert.isTrue(check(data).isNumber('_float').ok());
        }
    },
    'isDate()': {
        'isDate(<string>) fails': function () {
            assert.isFalse(check(data).isDate('_string').ok());
        },
        'isDate(<date>) is OK': function () {
            assert.isTrue(check(data).isDate('_date').ok());
        }
    },
    'isBoolean()': {
        'isBoolean(<string>) fails': function () {
            assert.isFalse(check(data).isBoolean('_string').ok());
        },
        'isBoolean(<boolean>) is OK': function () {
            assert.isTrue(check(data).isBoolean('_boolean').ok());
        }
    },
    'isRegExp()': {
        'isRegExp(<string>) fails': function () {
            assert.isFalse(check(data).isRegExp('_string').ok());
        },
        'isRegExp(<regexp>) is OK': function () {
            assert.isTrue(check(data).isRegExp('_regexp').ok());
        }
    }
})['export'](module);

