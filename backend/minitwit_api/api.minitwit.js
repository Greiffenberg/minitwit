const promBundle = require("express-prom-bundle")
const express = require('express')
const app = express()

// Metrics for prometheus monitoring
const metricsMiddleware = promBundle({});
app.use(metricsMiddleware);

// For parsing packet body to js objects by json format
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Enables all cors on all routes
const cors = require('cors')
app.use(cors())

// Read of .env file variables
require('dotenv').config()

// Import routes and use them for all API routes
const apiRoutes = require("./src/api-routes")
app.use('/', apiRoutes)

const server = "dummy, eslint unused var test"
app.listen(3005, () => console.log(`Listening on http://localhost:3005`))