//This code requires mongoose node module
const mongoose = require('mongoose');
const globals = require('../../src/config/globals.json');

//connecting local mongodb database named test
const mongoDB = globals.db_mongo_local_test_ip;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//testing connectivity
mongoose.connection.once('connected', function() {
	console.log("Database connected successfully")
});