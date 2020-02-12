const globals = require('../config/globals.json');
const mongoose = require('mongoose');

// CONNECT TO DB
console.log("log", globals.db_mongo_remote_ip);

//connecting remote mongodb database named test
const mongoDB = globals.db_mongo_remote_ip;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//testing connectivity
mongoose.connection.once('connected', function() {
    console.log("Database connected successfully")
});