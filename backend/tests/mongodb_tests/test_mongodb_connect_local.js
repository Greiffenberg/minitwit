//This code requires mongoose node module
const mongoose = require('mongoose');

//connecting local mongodb database named test
const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//testing connectivity
mongoose.connection.once('connected', function() {
	console.log("Database connected successfully")
});