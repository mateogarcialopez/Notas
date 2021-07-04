const { Router } = require('express')
const router = Router()
const ctrlNotes = require('../controllers/nota.controller')
const ctrlUser = require('../controllers/usuario.controller')

//usuarios
router.post('/addUser', ctrlUser.addUser)
router.post('/getUser', ctrlUser.getUserById)
router.get('/getUsers', ctrlUser.getUsers)
router.put('/editUser', ctrlUser.editUser)
router.post('/disableUser', ctrlUser.disableUser)

module.exports = router