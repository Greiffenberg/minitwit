const {User} = require('../DatabaseActions/models/user');
const {db_mongo_local_ip} = require('../config/globals.json');
const mongoose = require('mongoose');

// CONNECT TO DB
console.log("log", db_mongo_local_ip);

//connecting remote mongodb database named test
const mongoDB = db_mongo_local_ip;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//testing connectivity
mongoose.connection.once('connected', function() {
    console.log("Database connected successfully")
});

/** Get all examples */
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

/** Creates a single new example */
exports.createUser = async (req, res) =>  {

    // Extract some parameters from my body
    let { name, value } = req.body;

    // Verify that the name is present and sufficient
    if (name || name.length < 2) {
        console.log(req.body);
        return res.status(400).json({error: true, message: 'The example requires a name of length atleast 2.'})
    }

    // Very that the value is present and non-negative
    if (!value || value < 0){
        console.log(req.body);
        return res.status(400).json({error: true, message: 'The example requires a value of minimum 0.0'})
    }

    try{
        // Create the example
        let newEx = await db.query('INSERT INTO Example (name, value) VALUES (?, ?)', [name, value])

        // Return the status and data to the client
        return res.json({
            error: false,
            message: 'Example created.',
            data: {id: newEx.insertId}
        })
    } catch(error) {

        // Catch duplicate entry
        let msg = error.errno === 1062 ? 'Some example with this name already exists' : 'Failed to create example'

        // Return error info and statuses to the client
        return res.json({
            error: true,
            message: msg,
            data: error.message
        })
    }
}

/** Updates a single example name and value */
exports.updateUser = async (req, res) => {

    // Get values from request body
    let {id, name, value } = req.body

    // Check for ID
    if(!id) {
        console.log(req.body);
        return res.status(400).json({error: true, message: 'Please specify the example ID.'})
    }

    // Sanitize name
    if(!name || name.length < 2) {
        console.log(req.body);
        return res.status(400).json({error: true, message: 'Example must have "name" of atleast size 2.'})
    }

    // Sanitize value
    if(!value || value < 0) {
        console.log(req.body);
        return res.status(400).json({error: true, message: 'Example must have "value" of minimum value 0.0.'})
    }

    try{
        // Execute update
        let updateEx = await db.query('UPDATE Example SET name = ?, value = ? WHERE id = ?', [name, value, id])

        // Return the status and data to the client
        return res.json({
            error: false,
            message: 'Example updated.',
            data: null
        })
    } catch(error) {

        // Catch duplicate entry
        let msg = error.errno === 1062 ? 'Some example with this name already exists' : 'Failed to update example'

        // Return error info and statuses to the client
        return res.json({
            error: true,
            message: msg,
            data: error.message
        })
    }
}

/** Deletes a single example */
exports.deleteUser = async (req, res) => {
    let { id } = req.body

    if(!id) return res.status(400).send({ error: true, message: "Please provide an example id"})

    try{
        // Execute delete query
        let deleted = await db.query('DELETE FROM Example WHERE id = ?', id)

        // Return the status and data to the client
        return res.json({
            error: false,
            message: 'Example deleted.',
            data: null
        })
    } catch(error) {

        // Return error info and statuses to the client
        return res.json({
            error: true,
            message: 'Failed to delete example',
            data: error.message
        })
    }
    
}

