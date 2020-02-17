const mongoose = require('mongoose');
const { Message } = require('./models/message');
const { User } = require('./models/user')
const { Follower } = require('./models/follower')

const { db_mongo_dev_path, db_mongo_production_path, db_mongo_dev_path_docker, timeline_post_limit } = require('../config/globals.json');

let currentDB = production_mode ? db_mongo_production_path : db_mongo_dev_path
if(process.env.NODE_ENV = 'docker'){
    currentDB = db_mongo_dev_path_docker;
}


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

/** Reads some messages by the from som user */
exports.readMessages = async (username) => {

    // Init messages
    let messages = []

    // If a username is given, find only messages by that user
    if(!!username){

        // Lookup the author
        let author = await User.findOne({name: username})
        
        // Find the messages by the author
        messages = await Message.find({author_id: author._id})
     
        // Format the messages to the expected output type
        messages = messages.map(msg => {
            return {content: msg.text, user: username}
        })
    } else {
        // When no username is given, find all the messages and lookup their authors
        messages = await Message.find({}).limit(timeline_post_limit)

        // Map over messages in parallel, and retrieve + format the author data
        messages = await Promise.all(messages.map(async (msg) => {
            let author = await User.findOne({_id: msg.author_id})
            return {content: msg.text, user: author.name}
        }))
    }

    return messages
}

/** Some user A follows some user B */
exports.followUser = async (userA, userB) => {

    // Find the object of each user
    userA = await User.findOne({name: userA})
    userB = await User.findOne({name: userB})

    // Use their ID's to make a follower relation
    let newFollower = { who_id: userA._id, whom_id: userB._id }

    // Create the follower
    await Follower(newFollower).save()
    return true
}

/** Some user A unfollows some user B */
exports.unfollowUser = async (userA, userB) => {

    // Find the object of each user
    userA = await User.findOne({name: userA})
    userB = await User.findOne({name: userB})

    // Construct a follower relation object using the ids
    let follower = { who_id: userA._id, whom_id: userB._id }

    // Find and delete the follower matching the object
    await Follower.deleteOne(follower)
    return true
}

/** Read the followers of some user */
exports.readFollowers = async (username) => {

    // Find the user object
    let user = await User.findOne({name: username})

    // Find the follows
    let follows = await Follower.find({who_id: user._id})

    // For each follower object, find the user and mutate the object into the username
    let followers = await Promise.all(follows.map(async (folObj) => {
        let user = await User.findOne({_id: folObj.whom_id})
        return user.name
    }))

    return followers
}