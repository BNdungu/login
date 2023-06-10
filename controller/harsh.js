const bcrypt = require('bcrypt')

const saltRounds = 10;

const hashedPassword = (password) => {
    return new Promise((resolve,reject) => {
        bcrypt.hash(password,saltRounds,(err,hashedPassword) => {
            if (err) reject(err)
            else resolve(hashedPassword)
        })
    })
}

const compareBcrypt = (passcode, passcrypt) => {
    return new Promise((resolve,reject) => {
        bcrypt.compare (passcode, passcrypt, (err,result) => {
            if (err){
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
}

module.exports = {
    hashedPassword,
    compareBcrypt
}