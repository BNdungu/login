const mysql = require('mysql')
require('dotenv').config()

db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB,

})
db.connect((err) => {
    if (err) throw err
    else{
        console.log('Connected to the Database')
    }
})
module.exports = db
