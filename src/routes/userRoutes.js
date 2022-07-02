const router = require('express').Router()
const userController = require('../controllers/userController')

// Rota para acessar o controller user
router.get('/users', userController.listUsers)

module.exports = router