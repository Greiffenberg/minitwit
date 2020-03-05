const { createMessage, readMessages } = require('../DatabaseActions/DBActions')
const {timeline_post_limit} = require('../config/globals')

/** Create a single message in the database */
exports.createMsg = async (req, res) => {
    try {
        // Deconstruct and sanitize data
        let { username } = req.params
        let { content } = req.body
        if(!content || content.length < 1) {
            return res.status(400).json({message: "Bad request, content was missing"})
        }

        // Format insert data for user, and insert it into DB
        let newMessage = {author: username, content};
        await createMessage(newMessage)

        // update latest - latest is a global var
        latest = !!req.query.latest ? req.query.latest : latest

        // Return success and latest
        return res.status(204).json({message: "Message was created!", latest: Number(latest)})
    } catch (error){

        // Log and return an error
        console.log(error)

        let msg = "Failed to create message - user might not exist"        
        return res.status(500).json({message: msg})
    }
}

/** Reads the messages available from all users */
exports.readMsgs = async (req, res) => {
    
    // Deconstruct the maximum number of returned messages from the query params
    let { no } = req.query

    if(!(!!no) || parseInt(no) <= 0){
        no = timeline_post_limit
    }
    console.log(no)

    // update latest - latest is a global var
    latest = !!req.query.latest ? req.query.latest : latest

    let msgs = await readMessages(null, no)

    return res.status(204).json(msgs)
}

/** Reads the messages by some user */
exports.readMsgsFromUser = async (req, res) => {
    try {

        // Deconstruct username from url params, and no from the query
        let { username } = req.params
        let { no } = req.query

        if(!(!!no) || parseInt(no) <= 0){
            no = timeline_post_limit
        }
        console.log(no)

        // update latest - latest is a global var
        latest = !!req.query.latest ? req.query.latest : latest

        // Get messages from database
        let msgs = await readMessages(username, no)

        return res.status(204).json(msgs)
    } catch (error){

        // Log and return an error
        console.log(error)

        let msg = "Failed to get messages from user."
        return res.status(500).json({message: msg})
    }
}
