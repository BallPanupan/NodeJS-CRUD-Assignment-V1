// This is global routes file
const express = require('express')
const router = express.Router()
const todolistRoutes = require('../services/todolists/routes/router')

router.use('/todolists', todolistRoutes)

module.exports = router
