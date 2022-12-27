const express = require('express')
const router = express.Router()
const controller = require('./controller')

/**
 *  @Url - http://localhost:3000/api/create-user
 * 
 * @payload - {"name" : "gaurav","email" : "gaurav@gmail.com","psw" : "gaurav" }
 * 
 */
router.post('/create-user', controller.create)

/**
 *  @Url - http://localhost:3000/api/login
 * 
 * @payload - {"name" : "gaurav","email" : "gaurav@gmail.com" }
 * 
 */
router.post('/login', controller.login)

/**
 *  @Url - http://localhost:3000/api/verify-user
 * 
 * @payload - { "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWUiOiJheXVzaGkiLCJlbWFpbCI6ImF5dXNoaUBnbWFpbC5jb20iLCJpYXQiOjE2NzIxNTUxNTN9.LlHASkSZWgwrCyzbRjmdg-9H1VgviMR2eu-QTpR4ys0" }
 * 
 */
router.post('/verify-user', controller.verifyUser)

module.exports = router;

