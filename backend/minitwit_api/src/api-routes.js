// Filename: api-routes.js
// Initialize express router
let router = require('express').Router()

// Setting up global values for the API!
latest = 0

// Set default API url to redirect for Swagger Doc
router.get('/', (req, res) => {
    res.redirect('/doc')
})

// Enables swagger documentation through comments
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Basic doc options
const options = {
    swaggerDefinition: {
        basePath: 'http://104.248.246.24/api/v1', // Base path (optional)
        info: {
            title: 'Minitwit Backend API',
            version: '1.0.0',
            description: 'This is the API for the minitwit application and simulation.',
        },
    },
    // List of files to be processes. You can also set globs './routes/*.js'
    apis: ['./src/api-routes.js'],
};

const specs = swaggerJsdoc(options);

router.use("/doc", swaggerUi.serve);

router.get("/doc", swaggerUi.setup(specs, { explorer: true }));

/** SIMULATOR API ENDPOINTS */

/** Register new user, get latest var, clear db for testing */
let ctrlUser = require('./Controllers/ctrlUser')
/**
 * General scrabing
 * @swagger
 *
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
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