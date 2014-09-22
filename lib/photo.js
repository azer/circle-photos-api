var debug = require("local-debug")('photo');
var memoize = require('./memoize');
var client = require("./flickr-client");
var getPhotoURLs = memoize(require("flickr-photo-urls")(client), -1);

module.exports = getPhotoURLs;
