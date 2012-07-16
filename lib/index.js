var assert = require('assert');

function check(config) {
    this._config = config;
    this._errors = [];
}

/*
 * Chainable commands.
 */
check.prototype.has = function (keyname) {
    if (!(keyname in this._config)) {
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
