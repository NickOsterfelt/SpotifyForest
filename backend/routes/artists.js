/** Routes for users. */

const express = require("express");
const router = express.Router();
const { authRequired } = require("../middleware/auth")
const Artist = require("../models/artists");
const UserArtist = require("../models/user_artists");
const SpotifyAPI = require("../models/SpotifyAPI");


/**     Get all artists 
 * GET / => {artist: [user, ...]} */
router.get("/", authRequired, async function (req, res, next) {
    try {
        const artists = await Artist.findAll();
        return res.json({ artists });
    } catch (err) {
        return next(err);
    }
});

/**     Get Artist data from artist id
 *  GET /id {artist: {id: **, ..}} */
router.get("/:id", authRequired, async function (req, res, next) {
    try {
        const artist = await SpotifyAPI.getArtistDetails(req.access_token);

        const data = {
            id: item.id,
            artist_name: item.name,
            image_url: item.images.length === 0 ? null : item.images[0],
            spotify_url: item.external_urls.spotify ? item.external_urls.spotify : null

        };
        //If artist exists, update. Else add new artist (shouldn't happen really);
        const exists = await Artist.exists(id);
        if (exists) {
            Artist.update(data);
        }
        else {
            Artist.add(data);
        }
        return res.json({ artist });
    } catch (err) {
        return next(err);
    }
});

/** Get User's top artists.
 * GET /user/:id => {artists : [artist1, ...]} */
router.get("/user/:id", async function (req, res, next) {
    try {
        const artists = UserArtist.getByUser(req.params.id);
        return res.json({ artists });
    }
    catch (err) {
        return next(err);
    }
});


module.exports = router;
