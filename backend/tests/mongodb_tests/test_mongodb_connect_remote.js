//This code requires mongoose node module
const mongoose = require('mongoose');
const globals = require('../../src/config/globals.json');

console.log("log", globals.db_mongo_remote_ip);

//connecting local mongodb database named test
const mongoDB = globals.db_mongo_remote_ip;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//testing connectivity
mongoose.connection.once('connected', function() {
	console.log("Database connected successfully")
});