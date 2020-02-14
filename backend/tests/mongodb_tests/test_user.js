const mongoose = require('mongoose');
const { User } = require('../../src/DatabaseActions/models/user');
const { db_mongo_local_ip } = require('../../src/config/globals.json');


const testUser = {name: 'OneDevOps', email:'odo@itu.dk', password:'ituaccess'};

run();

async function run(){
    await Connect();
    await AddUser(testUser);
    //await DeleteUser(testUser);
}


// CONNECT TO DB
async function Connect(){
    console.log("log", db_mongo_local_ip);

    //connecting remote mongodb database named test
    const mongoDB = db_mongo_local_ip;
    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

    //testing connectivity
    mongoose.connection.once('connected', function() {
        console.log("Database connected successfully")
    });
}


// ADD USER
async function AddUser(u){
    let user = await User(u)

    try {
        ret = await user.save();
    } catch (error) {
        console.log('Error adding user', error);
        return // handleError(err);
    }

    console.log('User added');
}

// DELETE THE USER
async function DeleteUser(u){
    let user = await User.findOneAndDelete(u);
    console.log('User deleted', user);
}