node-check
==========

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
		.has('database')
		.has('someOtherSetting')
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

Tests if the given key is present.

.assert()
---------

Stops the chaining and `assert`() if any keys were missing.

.isOK()
-------

Stops the chaining and returns if any errors were found.

.errors()
---------

Stops the chaining and returns a list of errors (if any).

Bugs
====

Plenty! Report them! And add ideas for great features.

License
=======

ISC see LICENSE.
