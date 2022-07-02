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

// 
const userRoutes = require('./src/routes/userRoutes')
app.use('/views', userRoutes)

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

