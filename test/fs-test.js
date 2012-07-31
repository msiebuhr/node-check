var vows = require('vows'),
    assert = require('assert'),
    check = require('../lib');

var data = {
    dirname: __dirname,
    filename: __filename
};

vows.describe("File-system checks").addBatch({
    'isFile()': {
        'isFile(__dirname) fails': function () {
            assert.isFalse(check(data).isFile('dirname').ok());
        },
        'isFile(__filename) is OK': function () {
            assert.isTrue(check(data).isFile('filename').ok());
        }
    },
    'isDirectory()': {
        'isDirectory(__filename) fails': function () {
            assert.isFalse(check(data).isDirectory('filename').ok());
        },
        'isDirectory(__dirname) is OK': function () {
            assert.isTrue(check(data).isDirectory('dirname').ok());
        }
    },
    'isSymbolicLink()': {
        'isSymbolicLink(__filename) fails': function () {
            assert.isFalse(check(data).isSymbolicLink('filename').ok());
        },
        'isSymbolicLink(__dirname) fails': function () {
            assert.isFalse(check(data).isSymbolicLink('dirname').ok());
        }
    },
    'isSocket()': {
        'isSocket(__filename) fails': function () {
            assert.isFalse(check(data).isSocket('filename').ok());
        },
        'isSocket(__dirname) fails': function () {
            assert.isFalse(check(data).isSocket('dirname').ok());
        }
    }
})['export'](module);

