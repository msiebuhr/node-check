var assert = require('assert');

function check(config) {
    this._config = config;
    this._errors = [];
}

/*
 * Internal helper functions
 */
check.prototype._getKey = function (keyname, testObj) {
    if (typeof keyname === 'string') {
        keyname = keyname.split(".");
    }

    // An non-existing key doesn't exist!
    if (keyname.length === 0) {
        return {error: 'Not found'};
    }

    var key = keyname.shift();

    // No key?
    if (!(key in testObj)) {
        return {error: 'Not found'};
    }

    // Try more!
    if (keyname.length > 1) {
        return this._getKey(keyname, testObj[key]);
    }

    // We're at the end.
    return {value: testObj[key]};
};

/*
 * Basic commands
 */
check.prototype.has = function (keyname) {
    var res = this._getKey(keyname, this._config);

    if (res.error) {
        this._errors.push("config error: Missing key '" + keyname + "'.");
    }

    return this;
};

/*
 * Test a given `key` using the `function(keyname, key value)`. If the function
 * returns a string or throws/returns an error, it will be considered a failed
 * test.
 *
 * If `key` doesn't exist, the test function won't be run at all.
 */
check.prototype.testFunction = function (key, testfunc) {
    var res = this._getKey(key, this._config);

    if (res.error) {
        this._errors.push("config error: Missing key '" + key + "'.");
        return this;
    }

    try {
        var result = testfunc(key, res.value),
            resultType = Object.prototype.toString.call(result);
        if (resultType === '[object Error]' || resultType === '[object String]') {
            this._errors.push("config error: " + (result.message || result));
        }
    } catch (e) {
        this._errors.push("config error: " + e.message);
    }

    return this;
};

/*
 * Type checks
 */
['Array', 'Boolean', 'Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'].forEach(function (name) {
    check.prototype['is' + name] = function (keyname) {
        var res = this._getKey(keyname, this._config);
        if (res.error) {
            this._errors.push("config error: Missing key '" + keyname + "'.");
            return this;
        }

        if (Object.prototype.toString.call(res.value) !== '[object ' + name + ']') {
            this._errors.push("config error: Key '" + keyname + "' should be type " + name);
        }

        return this;
    }
});

check.prototype.isObject = function (keyname) {
    var res = this._getKey(keyname, this._config);
    if (res.error) {
        this._errors.push("config error: Missing key '" + keyname + "'.");
    } else if (res.value !== Object(res.value)) {
        this._errors.push("config error: Key '" + keyname + "' should be an Object");
    }

    return this;
}

/*
 * Finalizers
 */
check.prototype.errors = function () {
    return this._errors;
};

check.prototype.ok = function () {
    return this._errors.length === 0;
};

check.prototype.assert = function () {
    assert(this._errors.length === 0);
};

/*
 * Export as a non-function.
 */
module.exports = function (config) {
    return new check(config);
};
