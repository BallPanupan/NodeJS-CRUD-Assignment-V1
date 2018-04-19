const express = require('express')
const router = express.Router()

const todolistsController = require('../controllers/todolists.js')

router.route('/')
  .get(todolistsController.get)

module.exports = router
