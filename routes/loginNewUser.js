const express = require('express')
const { body } = require('express-validator')

const loginNewUserController = require('../controllers/controLoginNewUser.js')

const User = require('../models/user')

const router = express.Router()

router.post('/', [
    body('email').isEmail()
    .withMessage('Please enter a valid email')
    .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
                return Promise.reject('Email address already exists.')
            }
        })
    })
    .normalizeEmail(),
    body('password')
        .trim()
        .not()
        .isEmpty()
], loginNewUserController.createNewUser)

router.get('/', loginNewUserController.getUser)

/* router.get('/', loginNewUserController.loginCheck) */

module.exports = router