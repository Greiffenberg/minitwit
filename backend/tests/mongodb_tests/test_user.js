const mongoose = require('mongoose');
const { User } = require('../../src/models/user');
const globals = require('../../src/config/globals.json');


const testUser = {name: 'OneDevOps', email:'odo@itu.dk', password:'ituaccess'};

run();

async function run(){
    await Connect();
    await AddUser(testUser);
    await DeleteUser(testUser);
}


// CONNECT TO DB
async function Connect(){
    console.log("log", globals.db_mongo_remote_ip);

    //connecting remote mongodb database named test
    const mongoDB = globals.db_mongo_remote_ip;
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