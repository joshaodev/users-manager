require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Para Ler JSON
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Configurar a View Engine
app.set('view engine', 'ejs')
app.set('views', './src/views')

// Importar o modelo de usuário
const UserModel = require('./src/models/user')

// Criando as rotas - Endpoints para manipulação do UserModel
app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({error})
    }
})

app.post('/users', async (req, res) => {
    try {
        const user = await UserModel.create(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(500).send({error})
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await UserModel.findOne({id: id})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

app.patch('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        // Procura e actualiza o registro com os dados que estão no body e retorna o registro actualizado.
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        // Procura e actualiza o registro com os dados que estão no body e retorna o registro actualizado.
        const deletedUser = await UserModel.findByIdAndRemove(id)
        res.status(200).json(deletedUser)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})


const DB_USER = process.env.DB_USERNAME
const DB_PASS = process.env.DB_PASSWORD
const PORT = process.env.PORT

// Criar conexão com o banco de dados.
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.ictzibf.mongodb.net/curso_nodejs?retryWrites=true&w=majority`)
.then( () => {
    console.log('Database connection successful!')
    // Rodando o servidor.
    app.listen(PORT, () => {
        console.log(`Server runing in http://localhost:${PORT}`)
    })
})
.catch((error) => {
    console.log('Database connection failed: ', error.message)
})

