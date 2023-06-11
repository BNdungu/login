const {hashedPassword, compareBcrypt} = require('./passwordUtils')

const login = (req,res) => {
    res.render('login',{title: 'Login System'})
}

const register = async (req,res) => {
    const {username,email,password} = req.body

    try {
        const hash = await hashedPassword(password)
        const values = [username,email,hash]
        const sql = 'INSERT INTO user (username,email,password) VALUES (?,?,?)'

        db.query(sql,values,(err,result) => {
            if (err) throw err
            else {
                res.redirect('/api/auth/v1')
            }
        })
    }catch (error) {
        console.error('Error hashing password:',error)
        res.status(500).send('Internal Server Error')
    }
    
}

const getRegister = (req,res) => {
    res.render('register',{title: 'Register'})
}

const success = (req,res) => {
    if (req.session.user){
        res.render('success',{user:req.session.user})
    }

    else{
        res.send('!!Unaothorised user!!')
    }
}

const submit = async (req,res) => {
    var sql = `SELECT password FROM user WHERE email = '${req.body.email}'`

    try{
    db.query(sql, async (err,result) => {
        if (err) throw err
        if (result.length == 0){
            return res.send('Invalid Account')
        }

    const condition = await compareBcrypt(req.body.password,result[0].password)
    if (condition){
        req.session.user = req.body.email
        res.redirect('/api/auth/v1/submit')
    }
    else{
        res.status(401).send('Authentication Failed')
        }
    }
     )} catch{
            throw err
        }
    }
        
const getSubmit = (req,res) => {
    res.render('success',{title: 'Success'})
}

const logout = (req,res) => {
    req.session.destroy((err) => {
        if (err) throw err
        else{
            res.redirect('/api/auth/v1')

        }
    })
}

module.exports = {
    login,
    register,
    getRegister,
    success,
    submit,
    getSubmit,
    logout,
}
