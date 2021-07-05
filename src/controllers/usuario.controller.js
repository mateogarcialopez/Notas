const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
            rol: req.body.rol
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

        const userFinded = await pool.query(`SELECT identificacion, nombre, apellido, correo, estado FROM usuarios WHERE identificacion = ?`, [req.body.identificacion])
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

        const { identificacion } = req.params
        const user = {
            identificacion: req.body.identificacion,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            contrasena: bcrypt.hashSync(req.body.contrasena, 10),
        }

        const userUpdated = await pool.query(`UPDATE usuarios SET ? WHERE identificacion = ?`, [user, identificacion])

        return res.json({
            status: true,
            message: 'Usuario actualizado',
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            error
        })
    }
}

const disableUser = async (req, res) => {
    try {

        const { identificacion } = req.params

        const userDisabled = await pool.query('UPDATE usuarios SET estado = "Inactivo" WHERE identificacion = ?', [identificacion])

        return res.json({
            status: true,
            message: 'Usuario inhabilitado',
        })

    } catch (error) {
        return res.status(400).json({
            status: false,
            error
        })
    }
}

const enableUser = async (req, res) => {
    try {

        const { identificacion } = req.params

        const userDisabled = await pool.query('UPDATE usuarios SET estado = "Activo" WHERE identificacion = ?', [identificacion])


        return res.json({
            status: true,
            message: 'Usuario habilitado',
        })

    } catch (error) {
        return res.status(400).json({
            status: false,
            error
        })
    }
}

const login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body
        const correoFinded = await pool.query('SELECT identificacion, nombre, apellido, correo, contrasena, estado, rol FROM usuarios WHERE correo = ?', [correo])
        if (correoFinded.length > 0) {
            const password = bcrypt.compareSync(contrasena, correoFinded[0].contrasena)
            if (password) {
                correoFinded[0].contrasena = null
                const token = jwt.sign({ user: correoFinded }, 'claveSecreta', { expiresIn: '48h' })
                return res.json({
                    status: true,
                    token: token
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: "corrreo o (contraseña) invalidos"
                })
            }
        } else {
            return res.status(404).json({
                status: false,
                message: "(corrreo) o contraseña invalidos"
            })
        }
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
    disableUser,
    enableUser,
    login
}