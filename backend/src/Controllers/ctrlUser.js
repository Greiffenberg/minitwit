const { createUser, clearLocalDB } = require('../DatabaseActions/DBActions')

/**********************************************************/

/** Clear the local db - for running unit tests */
exports.clearLocalDB = async (req, res) => {
    try{
        if(!production_mode){
            await clearLocalDB()
            return res.status(204).json()
        }else{
            return res.status(400).json()
        }
    } catch(error) {
        return res.status(500).json({error: error})
    }
}

/** Register a single user in the database */
exports.register = async (req, res) => {
    try {
        // Deconstruct and sanitize data
        let {username, email, pwd} = req.body
        if(!username || !email | !pwd) {
            return res.status(400).json({message: "Bad request, data was missing"})
        }

        // Format insert data for user
        let newUser = {name: username, email, password: pwd};

        // Insert user in DB
        await createUser(newUser)

        // latest is a global var
        latest = !!req.query.latest ? req.query.latest : latest

        // Return success and latest
        return res.status(200).json({message: "User was created!", latest: Number(latest)})
    } catch (error){

        // Check for duplicate entry
        let msg = error.code === 11000 ? "Email address already in use" : "Failed to register user"
        
        console.log("Failed to register user")
        console.log(error)

        // Return error and message
        return res.status(500).json({message: msg})
    }
}

/** Return the latest global value */
exports.latest = async (req, res) => {
    return res.status(200).json({latest: Number(latest)})
}