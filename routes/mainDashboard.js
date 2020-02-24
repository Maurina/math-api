const express = require('express')

const mainDashboardController = require('../controllers/controMainDashboard')

const router = express.Router()

router.get('/maindashboard', mainDashboardController.mainDashboardInfo)


module.exports = router