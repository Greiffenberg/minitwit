let db = require('../../dbconnector').connection

/** Get all examples */
exports.examples = async (req, res) => {
    try {

        /** How to do it with the MySQL driver:
         *  let examples = await db.query('SELECT * FROM Examples')
         */

            // Some dummy data
        let examples = [
                {
                    id: 1,
                    name: 'I am an example!!',
                    value: 150
                },
                {
                    id: 19,
                    name: 'I am another dummy-example!!',
                    value: 295.5
                }
            ]

        // Return data and statuses to the client
        return res.json({
            error: false,
            message: "All examples",
            data: examples
        })

    }catch(error){
        // Return error info and statuses to the client
        return res.json({
            error: true,
            message: "Failed to retrieve examples!",
            data: error.message
        })
    }
}

/** Creates a single new example */
exports.createEx = async (req, res) =>  {

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
exports.updateEx = async (req, res) => {

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
exports.deleteEx = async (req, res) => {
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