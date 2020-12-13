const express = require("express");
const auth = require("../middleware/auth");
const { authRequired } = require("../middleware/auth");
const router = express.Router();

const Group = require("../models/groups");
const UserGroup = require("../models/user_groups");
/**     Create a new group based on groupData
 * Post {groupData} => {msg: "group created!"}*/
router.post("/new", authRequired, async function (req, res, next) {
    try {
        const data = req.body.data.data;
        let group = await Group.add(data);
        const userRes = await UserGroup.addUser(req.body.data.userId, group.id);
        group.num_users = 1;
        return res.json({ group });
    } catch (err) {
        return next(err);
    }
});
/**      Get all groups
 *  GET / => {groups : [group1, ...]}
 */ 
router.get("/", authRequired, async function (req, res, next) {
    try {
        const groups = await Group.findAll();
        return res.json({ groups });
    } catch (err) {
        return next(err);
    }
});
/**      Get group by groupId
 *  GET /groupId => {group: {groupId: id, ...}}
 */ 
router.get("/:groupId", authRequired, async function (req, res, next) {
    try {
        const group = await Group.findOne(req.params.groupId)
        const users = await UserGroup.getUsers(req.params.groupId);
        group.users = users;
        return res.json({ group });
    } catch (err) {
        return next(err);
    }
});
/**     Search groups by group name
 *  POST ({search: "test"}) => {groups: [{test1}, {test2}]}
 */
router.post("/search", authRequired, async function (req, res, next) {
    try {
        const groups = await Group.search(req.body.search);
        return res.json({ groups })
    }
    catch (err) {
        return next(err);
    }
});

/** 
 * user_group ROUTES:
 *      -user joining groups
 *      -user leaving groups
 *      -get groups with matching tracks
 *      -get groups with matching artists
*/

/** Join group with groupId 
 * POST /join/:groupId (userId) => {msg: "user added..."}
*/
router.post("/join/:groupId", authRequired, async function (req, res, next) {
    try {
        const result = UserGroup.addUser(req.body.userId, req.params.groupId);
        return res.json({msg: `User added to group: ${req.body.groupId}`})
    }
    catch (err) {
        return next(err);
    }
});
/** Join group with groupId 
 * POST /leave/:groupId (userId) => {msg: "user removed..."}
*/
router.post("/leave/:groupId", authRequired, async function (req, res, next) {
    try {
        const result = UserGroup.removeUser(req.body.userId, req.params.groupId);
        if (res) {
            return res.send({ msg: "User removed from group" });
        }
        else {
            return res.send({ msg: `User not in group: ${req.body.groupId}` });
        }
    }
    catch (err) {
        return next(err);
    }
});
/**     Search groups with matching user tracks
 *  POST /search/tracks {[trackA, trackB, trackC]} => [{group1, [trackA, trackB]}, {group2, [trackB]}, {group3, [trackD]}]
 */
router.post("/search/tracks", authRequired, async function (req, res, next) {
    try {
        const groups = await UserGroup.match_groups_tracks(req.body.tracks)
        return res.json({ groups });
    } catch (err) {
        return next(err);
    }
});
/**     Search groups with matching user artists
 *  POST /search/artists {[artistA, artistB, artistC]} => [{group1, [artistsA, artistB]}, {group2, [artistB]}, {group3, [artistD]}]
 */
router.post("/search/artists", authRequired, async function (req, res, next) {
    try {
        const groups = await UserGroup.match_groups_tracks(req.body.artists)
        return res.json({ groups });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;