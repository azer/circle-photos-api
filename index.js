var api = require("circle");
var listFavs = require("./lib/favorites");
var listCircleFavs = require("./lib/circle-favorites");
var listPhotoURLs = require("./lib/photo");
var getUser = require('./lib/user');

module.exports = api({
  '/favorites/:user': favs,
  '/circle-favorites/:user': circleFavs,
  '/photo/:photo': photo
});

function circleFavs (reply, match) {
  listCircleFavs(match.params.user, reply);
}

function photo (reply, match) {
  listPhotoURLs(match.params.photo, reply);
}

function favs (reply, match) {
  getUser(match.params.user, function (error, user) {
    if (error) return reply(error);

    listFavs(user.id, reply);
  });
}
