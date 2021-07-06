const { Router } = require('express')
const router = Router()
const ctrlNotes = require('../controllers/nota.controller')
const ctrlUser = require('../controllers/usuario.controller')
const {verifyToken} = require('../middlewares/verifyToken')
const {verifyRol} = require('../middlewares/verifyRol')

//usuarios
router.post('/login', ctrlUser.login)
router.post('/addUser', ctrlUser.addUser)
router.post('/getUser', [verifyToken, verifyRol], ctrlUser.getUserById)
router.get('/getUsers', [verifyToken, verifyRol], ctrlUser.getUsers)
router.put('/editUser/:identificacion', [verifyToken, verifyRol], ctrlUser.editUser)
router.post('/disableUser/:identificacion', [verifyToken, verifyRol], ctrlUser.disableUser)
router.post('/enableUser/:identificacion', [verifyToken, verifyRol], ctrlUser.enableUser)

//Notas
router.post('/addNota', [verifyToken], ctrlNotes.addNota)
router.get('/getNotas', [verifyToken], ctrlNotes.getNotas)
router.put('/editNota/:id', [verifyToken], ctrlNotes.editNotas)
router.delete('/deleteNota/:id', [verifyToken], ctrlNotes.deleteNota)

module.exports = router