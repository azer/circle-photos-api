var debug = require("local-debug")('favorites');
var memoize = require('./memoize');
var client = require("./flickr-client");
var get = memoize(require("flickr-favorites")(client), '24 hours');

module.exports = favs;

function favs (id, callback) {
  get(id, function (error, favs) {
    if (error) return callback(error);
    callback(undefined, favs.photos);
  });
}
