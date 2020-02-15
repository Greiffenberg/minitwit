const {User} = require('../DatabaseActions/models/user');
const {db_mongo_local_ip} = require('../config/globals.json');
const mongoose = require('mongoose');

/******************** CONNECT TO DB ***********************/

console.log("Connecting to database at: ", db_mongo_local_ip);

mongoose.connect(db_mongo_local_ip, { useNewUrlParser: true, useUnifiedTopology: true });

//testing connectivity
mongoose.connection.once('connected', function() {
    console.log("Database connected successfully")
});

/**********************************************************/

/** Register a single user in the database */
exports.register = async (req, res) => {
    try {

    } catch (error){
        return res.status(500).json({error})
    }
}

/** Get all users */
exports.users = async (req, res) => {
    try {

        let users = await User.find({});

        console.log('user count: ', users.length);

        // Return data and statuses to the client
        return res.json({
            error: false,
            message: "All Users",
            data: users
        })

    }catch(error){
        // Return error info and statuses to the client
        return res.json({
            error: true,
            message: "Failed to retrieve Users!",
            data: error.message
        })
    }
}