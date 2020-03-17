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
        basePath: '/api/v1', // Base path (optional)
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

router.route('/latest').get(ctrlUser.latest)
/**
 * General scrabing
 * @swagger
 *
 * /latest:
 *   get:
 *     description: Get latest accepted id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: latest
 */

router.route('/register').post(ctrlUser.register)
/**
 * General scrabing
 * @swagger
 *
 * /register:
 *   post:
 *     description: Post new user to register
 *     produces:
 *       - application/json
 *     parameters:
 *           - name: latest
 *             in: query
 *             description: latest id sent by simulator api
 *             required: false
 *             type: number
 *           - name: username
 *             in: body
 *             description: desired username for the new user
 *             required: true
 *             type: string
 *           - name: email
 *             in: body
 *             description: desired email for the new user
 *             required: true
 *             type: string
 *           - name: pwd
 *             in: body
 *             description: desired username for the new user
 *             required: true
 *             type: string
 *     responses:
 *       204:
 *         description: User registered
 *       400:
           description: Error on insertion
 */

/** , read all messages, read and create user messages */
let ctrlMsg = require('./Controllers/ctrlMessage')
router.route('/msgs/').get(ctrlMsg.readMsgs)
router.route('/msgs/:username').post(ctrlMsg.createMsg)
router.route('/msgs/:username').get(ctrlMsg.readMsgsFromUser)
/**
 * General scrabing
 * @swagger
 *
 * /msgs:
 *   get:
 *     description: Get all messages
 *     produces:
 *       - application/json
 *     parameters:
 *           - name: no
 *             in: query
 *             description: Number of messages, to read
 *             required: false
 *             type: number
 *           - name: latest
 *             in: query
 *             description: latest id sent by simulator api
 *             required: false
 *             type: number
 *     responses:
 *       200:
 *         description: Message created
 */

/**
* General scrabing
* @swagger
*
* /msgs/{username}:
*   get:
*     description: Find user messages by username
*     produces:
*       - application/json
*     parameters:
*           - name: Authorization
*             in: header
*             required: true
*           - name: username
*             in: path
*             description: username of user to return
*             reguired: true
*           - name: no
*             in: query
*             description: pass an optional search string for looking up inventory
*             required: false
*           - name: latest
*             in: query
*             description: latest id sent by simulator api
*             required: false
*     responses:
*       200:
*         description: Successful operation
*       401:
*         description: Unauthorized
*       404:
*        description: User not found
*
*   post:
*     description: Creates user messages
*     produces:
*       - application/json
*     parameters:
*           - name: Authorization
*             in: header
*             required: true
*           - name: username
*             in: path
*             description: username of user to return
*             reguired: true
*           - name: no
*             in: query
*             description: pass an optional search string for looking up inventory
*             required: false
*           - name: latest
*             in: query
*             description: latest id sent by simulator api
*             required: false
*
*     responses:
*       200:
*         description: Successful operation
*       401:
*         description: Unauthorized
*       404:
*        description: Invalid username supplied
*/

/** Follow, Unfollow and get followers of some user */
let ctrlFollower = require('./Controllers/ctrlFollower')
router.route('/fllws/:username').post(ctrlFollower.handleFollow)
router.route('/fllws/:username').get(ctrlFollower.getFollowers)

/**
* General scrabing
* @swagger
*
* /fllws/{username}:
*   get:
*     description: Get followers of user
*     produces:
*       - application/json
*     parameters:
*           - name: Authorization
*             in: header
*             required: true
*           - name: username
*             in: path
*             description: username of user to return
*             reguired: true
*           - name: no
*             in: query
*             description: pass an optional search string for looking up inventory
*             required: false
*           - name: latest
*             in: query
*             description: latest id sent by simulator api
*             required: false
*     responses:
*       200:
*         description: Successful operation
*       401:
*         description: Unauthorized
*       404:
*        description: Invalid username supplied
*
*   post:
*     description: Follow given username
*     produces:
*       - application/json
*     parameters:
*           - name: Authorization
*             in: header
*             required: true
*           - name: username
*             in: path
*             description: username of user to return
*             reguired: true
*           - name: no
*             in: query
*             description: pass an optional search string for looking up inventory
*             required: false
*           - name: latest
*             in: query
*             description: latest id sent by simulator api
*             required: false
*
*     responses:
*       200:
*         description: Successful operation
*       401:
*         description: Unauthorized
*       404:
*        description: Invalid username supplied
*/

// Export API routes
module.exports = router;
