const mongoose = require('mongoose');
const { Message } = require('./models/message');
const { User } = require('./models/user')
const { Follower } = require('./models/follower')

/******************** CONNECT TO DB ***********************/

let currentDB = getDBString();

console.log("Absract connecting to database at: ", currentDB)

mongoose.connect(currentDB, { useNewUrlParser: true, useUnifiedTopology: true })

//testing connectivity
mongoose.connection.once('connected', function() {
    console.log("Database connected successfully")
})

/**********************************************************/

/******************** ABSTRACT DB ACTIONS *****************/

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
exports.readMessages = async (username, no) => {

    // Init messages
    let messages = []

    // If a username is given, find only messages by that user
    if(!!username){

        // Lookup the author
        let author = await User.findOne({name: username})
        
        // Find the messages by the author
        messages = await Message.find({author_id: author._id}).limit(parseInt(no))
     
        // Format the messages to the expected output type
        messages = messages.map(msg => {
            return {content: msg.text, user: username}
        })
    } else {
        // When no username is given, find all the messages and lookup their authors
        messages = await Message.find({}).limit(parseInt(no))

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
exports.readFollowers = async (username, no) => {

    // Find the user object
    let user = await User.findOne({name: username})

    // Find the follows
    let follows = await Follower.find({who_id: user._id}).limit(no);

    // Map follower ids to ObjectIds
    let ids = follows.map(f => mongoose.Types.ObjectId(f.whom_id))

    // Find the Users from the Ids
    let result = await User.find({_id: {$in: ids}}, {name: 1, _id:0})

    // Map the names of the followers
    let followers = result.map(u => u.name)

    return followers
}

function getDBString() {
    let dbPath = "";

    const { db_mongo_localhost_path, db_mongo_docker_path } = require('../config/globals.json');

    if (!!process.env.DOCKER_NETWORK && process.env.DOCKER_NETWORK === 'enabled') {
        dbPath = db_mongo_docker_path;
    } else {
        dbPath = db_mongo_localhost_path;
    }

    return dbPath;
}