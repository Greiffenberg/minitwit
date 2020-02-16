const mongoose = require('mongoose');
const { Message } = require('./models/message');
const { User } = require('./models/user')
const { Follower } = require('./models/follower')

const { db_mongo_dev_path, db_mongo_production_path } = require('../config/globals.json');

let currentDB = production_mode ? db_mongo_production_path : db_mongo_dev_path


/******************** CONNECT TO DB ***********************/

console.log("Production mode: ", production_mode)

console.log("Absract connecting to database at: ", currentDB)

mongoose.connect(currentDB, { useNewUrlParser: true, useUnifiedTopology: true })

//testing connectivity
mongoose.connection.once('connected', function() {
    console.log("Database connected successfully")
})

/**********************************************************/

/******************** ABSTRACT DB ACTIONS *****************/

/** Clears all the local db data, made for testing purposes */
exports.clearLocalDB = async () => {
    if(!production_mode){
        await Follower.deleteMany({})
        await Message.deleteMany({})
        await User.deleteMany({})
        return true
    }else{
        return false
    }
}

/** Creates a single user in the db */
exports.createUser = async (user) => {
    await User(user).save()
    return true
}

/** Creates a single message in the db */
exports.createMessage = async (message) => {

    // Find the author
    let msgAuthor = await User.findOne({name: message.author})
    
    // Format the msg data
    let newMsg = {author_id: msgAuthor._id, text: message.content}
    
    // Insert the message
    await Message(newMsg).save()
    return true
}