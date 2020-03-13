// Filename: api-routes.js
// Initialize express router
let router = require('express').Router()

// Setting up global values for the API!
latest = 0

/** SIMULATOR API ENDPOINTS */

/** Register new user, get latest var, clear db for testing */
let ctrlUser = require('./Controllers/ctrlUser')
router.route('/latest').get(ctrlUser.latest)
router.route('/register').post(ctrlUser.register)

/** , read all messages, read and create user messages */
let ctrlMsg = require('./Controllers/ctrlMessage')
router.route('/msgs/').get(ctrlMsg.readMsgs)
router.route('/msgs/:username').post(ctrlMsg.createMsg)
router.route('/msgs/:username').get(ctrlMsg.readMsgsFromUser)

/** Follow, Unfollow and get followers of some user */
let ctrlFollower = require('./Controllers/ctrlFollower')
router.route('/fllws/:username').post(ctrlFollower.handleFollow)
router.route('/fllws/:username').get(ctrlFollower.getFollowers)

// Export API routes
module.exports = router;