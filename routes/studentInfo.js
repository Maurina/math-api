const express = require('express')

const studentController = require('../controllers/controStudent')

const router = express.Router()

router.get('/studentdashboard', studentController.getStudentInfo)


module.exports = router