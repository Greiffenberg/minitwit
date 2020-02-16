/** Create a single message in the database */
exports.createMsg = async (req, res) => {
    try {
        // Deconstruct and sanitize data
        let { username } = req.username
        console.log(username)
        let { content } = req.body
        if(!content || content.length < 1) {
            return res.status(400).json({message: "Bad request, data was missing"})
        }

        // Format insert data for user
        let newMessage = {name: username, email, password: pwd};

        // Insert user in DB
        await User(newUser).save()

        // latest is a global var
        latest = !!req.query.latest ? req.query.latest : latest

        // Return success and latest
        return res.status(200).json({message: "User was created!", latest: Number(latest)})
    } catch (error){

        // Check for duplicate entry
        let msg = error.code === 11000 ? "Email address already in use" : "Failed to register user"
        
        // Return error and message
        return res.status(500).json({message: msg})
    }
}