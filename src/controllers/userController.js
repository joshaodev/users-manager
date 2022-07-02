const UserModel = require('../models/user')

// Rota para mostrar a pagina de usuarios
exports.listUsers = async (req, res) => {
    try {
        const users = await UserModel.find({})
        res.render('index', { users })
    } catch (error) {
        console.log(error)
    }
}