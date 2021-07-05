const { Router } = require('express')
const router = Router()
const ctrlNotes = require('../controllers/nota.controller')
const ctrlUser = require('../controllers/usuario.controller')
const {verifyToken} = require('../middlewares/verifyToken')
const {verifyRol} = require('../middlewares/verifyRol')

//usuarios
router.post('/addUser', ctrlUser.addUser)
router.post('/getUser', ctrlUser.getUserById)
router.get('/getUsers', [verifyToken, verifyRol], ctrlUser.getUsers)
router.put('/editUser/:identificacion', ctrlUser.editUser)
router.post('/disableUser/:identificacion', ctrlUser.disableUser)
router.post('/enableUser/:identificacion', ctrlUser.enableUser)
router.post('/login', ctrlUser.login)

//Notas

module.exports = router