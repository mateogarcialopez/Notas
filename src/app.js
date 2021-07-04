require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


//middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//routes
app.use('/api', require('./routes/index.router'))


//server
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})

//NOTA: id, titulo, subtitulo, descripción, foto, idUser.
//USUARIO: identificación, nombre, apellido, correo, contraseña, estado.