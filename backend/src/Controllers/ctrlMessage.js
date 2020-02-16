const { createMessage, readMessages } = require('../DatabaseActions/DBActions')

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
        return res.status(200).json({message: "Message was created!", latest: Number(latest)})
    } catch (error){

        // Log and return an error
        console.log(error)

        let msg = "Failed to create message - user might not exist"        
        return res.status(500).json({message: msg})
    }
}

exports.readMsgs = async (req, res) => {
    try {

        // Deconstruct username from url params
        let { username } = req.params

        // update latest - latest is a global var
        latest = !!req.query.latest ? req.query.latest : latest

        // Get messages from database
        let msgs = await readMessages(username)

        return res.status(200).json(msgs)
    } catch (error){

        // Log and return an error
        console.log(error)

        let msg = "Failed to get messages from user."
        return res.status(500).json({message: msg})
    }
}