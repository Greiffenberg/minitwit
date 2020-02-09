/** This file is responsible creating a database connection */
const mysql = require('mysql')
const util = require('util')

let pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'admin',
    password: 'password',
    database: 'minitwit_db',
    port: 3306
})

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})

pool.query = util.promisify(pool.query) // Magic util to let me use async/await

exports.connection = pool;