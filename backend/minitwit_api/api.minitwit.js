const express = require('express')
const app = express()

// For parsing packet body to js objects by json format
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Enables all cors on all routes
const cors = require('cors')
app.use(cors())

// Import routes and use them for all API routes
const apiRoutes = require("./api-routes")
app.use('/', apiRoutes)

const server = app.listen(3005, () => console.log(`Listening on http://localhost:3005`))