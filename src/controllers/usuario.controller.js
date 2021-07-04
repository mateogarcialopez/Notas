const pool = require('../db')
const bcrypt = require('bcrypt')

const prueba = (req, res) => {
    return res.json({
        status: true,
    })
}

const addUser = async (req, res) => {
    try {
        const user = {
            identificacion: req.body.identificacion,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            contrasena: bcrypt.hashSync(req.body.contrasena, 10),
        }

        const userSaved = await pool.query('INSERT INTO usuarios SET ?', [user])

        res.json({
            status: true,
            message: 'Usuario almacenado con exito',
        })

    } catch (error) {
        return res.status(400).json({
            status: false,
            error
        })
    }
}

const getUserById = async (req, res) => {
    try {

        const userFinded = await pool.query(`SELECT identificacion, nombre, apellido, correo, estado FROM usuarios WHERE identificacion = ${req.body.identificacion}`)
        if (userFinded.length >= 1) {
            return res.json({
                status: true,
                message: 'Usuario encontrado',
                user: userFinded
            })
        } else {
            return res.status(404).json({
                status: false,
                message: 'No se encontro el usuario'
            })
        }

    } catch (error) {
        return res.status(400).json({
            status: false,
            error
        })
    }
}


const getUsers = async (req, res) => {
    try {
        const usersFinded = await pool.query(`SELECT identificacion, nombre, apellido, correo, estado FROM usuarios`)
        if (usersFinded.length >= 1) {
            return res.json({
                status: true,
                message: 'Usuario encontrado',
                user: usersFinded
            })
        } else {
            return res.status(404).json({
                status: false,
                message: 'No se encontraron usuarios'
            })
        }

    } catch (error) {
        return res.status(400).json({
            status: false,
            error
        })
    }
}

const editUser = async (req, res) => {
    try {



    } catch (error) {
        return res.status(400).json({
            status: false,
            error
        })
    }
}

const disableUser = async (req, res) => {
    try {



    } catch (error) {
        return res.status(400).json({
            status: false,
            error
        })
    }
}

module.exports = {
    prueba,
    addUser,
    getUserById,
    getUsers,
    editUser,
    disableUser
}