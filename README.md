node-check
==========

Configuration checker.

[![Build Status](https://secure.travis-ci.org/msiebuhr/node-check.png?branch=master)](http://travis-ci.org/msiebuhr/node-check)

Install
-------

    npm install check

(Or clone the repo.)

Usage
-----

    var check = require('check');

	var config = {
	    database: 'foo',
		someOtherSetting: 'bar'
	};

	check(config)
		.has('database.hostname') // Implicitly checks 'database'
		.isBoolean('database.debug')
		.has('missingSetting')   // Missing key - this will make check fail.
		.assert();               // This will assert all keys are there.
	
API
===

Initialization
--------------

    check(object-literal)

Returns an object on which you can chain tests.

.has(key)
---------

Tests if the given key is present. This also works with dot-notation, so
`has('foo.bar')` will check if `foo` exists and then if `foo` has a `bar`-thing
stuck on.

.isArray(key), .isBoolean(key), .isArguments(key), .isFunction(key), .isString(key), .isNumber(key), .isDate(key) and .isRegExp(key)
------------------------------------------------------------------------------------------------------------------------------------

First checks if the key is present (as if running `.has(key)`), and then if the
given key is the right type.

.assert()
---------

Stops the chaining and `assert`() if any keys were missing.

.ok()
-----

Stops the chaining and returns if any errors were found.

.errors()
---------

Stops the chaining and returns a list of errors (if any).

Bugs
====

Plenty! Report them! And add ideas for great features.

License
=======

ISC; see [LICENSE](https://github.com/msiebuhr/node-check/blob/master/LICENSE).
