var debug = require("local-debug")('user');
var memoize = require('./memoize');
var client = require("./flickr-client");

module.exports = memoize(require("flickr-user")(client), -1);
