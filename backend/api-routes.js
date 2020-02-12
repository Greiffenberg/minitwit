// Filename: api-routes.js
// Initialize express router
let router = require('express').Router()


/** CRUD Example ------------------------------- */
let ctrlEx = require('./src/Controllers/ctrlEx')
// Read all
router.route('/ex').get(ctrlEx.examples)
// Create
router.route('/ex').post(ctrlEx.createEx)
// Update
router.route('/ex').put(ctrlEx.updateEx)
// Delete
router.route('/ex').delete(ctrlEx.deleteEx)


/** CRUD Example ------------------------------- */
let ctrlExDb = require('./src/Controllers/ctrlExDb')
// Read all
router.route('/users').get(ctrlExDb.users)
// Create
router.route('/users').post(ctrlExDb.createUser)
// Update
router.route('/users').put(ctrlExDb.updateUser)
// Delete
router.route('/users').delete(ctrlExDb.deleteUser)

// Export API routes
module.exports = router;