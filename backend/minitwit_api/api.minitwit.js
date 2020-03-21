const promBundle = require("express-prom-bundle")
const fs = require('fs')
const path = require('path')
const express = require('express')
app = express()


// setup the logger
const morgan = require('morgan')
// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/minitwit_access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

// Metrics for prometheus monitoring
const metricsMiddleware = promBundle( {includeMethod: true}, {includePath: true}, {normalizePath: [
    ['/msgs/.*', '/msgs/#name'],
    ['/fllws/.*', '/fllws/#name']
  ]
  });
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

// const server = "dummy, eslint unused var test"
app.listen(3005, () => console.log(`Listening on http://localhost:3005`))