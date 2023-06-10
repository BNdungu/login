const express = require('express')
const {login,register,getRegister,success,logout,getSubmit,submit} = require('../controller/task')

const router = express.Router()

router.route('/').get(login)
router.route('/register').post(register).get(getRegister)
router.route('/success').get(success)
router.route('/logout').get(logout)
router.route('/submit').get(getSubmit).post(submit)

module.exports = router