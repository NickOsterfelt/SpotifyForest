/** Routes for users. */

const express = require("express");
const router = express.Router();
const {authRequired} = require("../middleware/auth");
const Track = require("../models/tracks");

const SpotifyAPI = require("../models/SpotifyAPI")

/**   GET all tracks
 * GET / => {tracks: [track, ...]} 
*/
router.get("/", authRequired, async function (req, res, next) {
  try {
    const tracks = await Track.findAll();
    return res.json({ tracks });
  } catch (err) {
    return next(err);
  }
});
/**   GET track by id
 * GET / => {tracks: [track, ...]} 
*/
router.get("/:id", authRequired, async function (req, res, next) {
  try {
    const track = await SpotifyAPI.getTrackDetails(req.access_token);

    const data = {
      id: item.id,
      track_name: item.name,
      image_url: item.album.images.length === 0 ? null : item.album.images[0],
      spotify_url: item.external_urls.spotify ? item.external_urls.spotify : null,
      artist_id: item.artists[0].id,
      artist_name: item.artists[0].name
    };
    //If track exists, update. Else add new track (shouldn't happen really);
    const exists = await Track.exists(id);
    if (exists) {
      Track.update(data);
    }
    else {
      Track.add(data);
    }
    return res.json({ track });
  } catch (err) {
    return next(err);
  }
});
/** GET user's top tracks 
 * GET /tracks/user/:id => {tracks: [track, track, ....]}
 */
router.get("/user/:id", async function (req, res, next) {
  try {
      const tracks = UserTracks.getByUser(req.params.id);
      return res.json({ tracks });
  }
  catch (err) {
      return next(err);
  }
});


module.exports = router;
