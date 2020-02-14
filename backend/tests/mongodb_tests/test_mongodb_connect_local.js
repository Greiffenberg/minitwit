//This code requires mongoose node module
const mongoose = require('mongoose');
const {db_mongo_local_ip} = require('../../src/config/globals.json');

//connecting local mongodb database named test
const mongoDB = db_mongo_local_ip;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//testing connectivity
mongoose.connection.once('connected', function() {
	console.log("Database connected successfully")
});