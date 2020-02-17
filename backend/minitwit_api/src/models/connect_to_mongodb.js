const globals = require('../config/globals.json');
const mongoose = require('mongoose');

if(globals.db_use_mongodb != "true") {
    console.log('DB Not using MongoDB');
    return;
}

const db_path = globals.db_use_local == 'true' ? globals.db_mongo_local_ip : globals.db_mongo_remote_ip;

// CONNECT TO DB
console.log("DB Connectiong to: ", db_path);

//connecting remote mongodb database named test
const mongoDB = db_path;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//testing connectivity
mongoose.connection.once('connected', function() {
    console.log("DB connected successfully")
});