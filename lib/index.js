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
 * Chainable commands.
 */
check.prototype.has = function (keyname) {
    var res = this._getKey(keyname, this._config);

    if (res.error) {
        this._errors.push("config error: Misses key '" + keyname + "'.");
    }

    return this;
};

/*
 * Finalizers
 */
check.prototype.errors = function () {
    return this._errors;
};

check.prototype.isOK = function () {
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
