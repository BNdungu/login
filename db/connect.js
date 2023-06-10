const mysql = require('mysql')

db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ndungu11',
    database: 'login',

})
db.connect((err) => {
    if (err) throw err
    else{
        console.log('Connected to the Database')
    }
})
module.exports = db