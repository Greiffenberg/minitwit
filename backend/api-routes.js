// Filename: api-routes.js
// Initialize express router
let router = require('express').Router()

// Setting up global values for the API!
latest = 0
production_mode = false

/** SIMULATOR API ENDPOINTS */
let ctrlUser = require('./src/Controllers/ctrlUser') 

router.route('/clear_db').get(ctrlUser.clearLocalDB)

router.route('/latest').get(ctrlUser.latest)
router.route('/register').post(ctrlUser.register)

let ctrlMsg = require('./src/Controllers/ctrlMessage')
router.route('/msgs/:username').post(ctrlMsg.createMsg)

// Export API routes
module.exports = router;