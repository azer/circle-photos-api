var debug = require("local-debug")('circle-favorites');
var loop = require("limited-parallel-loop");

var memoize = require('./memoize');
var client = require("./flickr-client");

var getFollowing = memoize(require("flickr-following")(client), '16 hours');
var getFavorites = require("./favorites");
var getUser = require("./user");

module.exports = circleFavorites;

function circleFavorites (username, callback) {
  debug('Listing the favorites of %s', username);

  getUser(username, function (error, user) {
    if (error) return callback(error);

    getFollowing(user.id, function (error, following) {
      if (error) return callback(error);

      var all = [];

      loop(following.length, 10, each, function (error) {
        if (error) return callback(error);

        callback(undefined, all);
      });

      function each (done, i) {
        getFavorites(following[i].nsid, function (error, result) {
          if (error) return done();

          all.push.apply(all, result);

          done();
        });
      }
    });
  });
}
