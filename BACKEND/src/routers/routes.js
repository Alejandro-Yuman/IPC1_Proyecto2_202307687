const express = require("express");

const router = express.Router();
const{hello} = require('../controllers/holamundo');
const {SingUp ,login} = require('../controllers/Authentication')
const {getUsers,editar ,eliminar} = require('../controllers/GestionPerfil')

//------------------------------Rutas
router.get('/mensaje',hello);


//------------------------------Authentication

//Get
router.get('/obtenerUsuarios',getUsers)

//Post
router.post('/registro',SingUp)
router.post('/login',login)

//Put
router.put('/actualizar',editar)

//Delete
router.delete('/eliminar',eliminar)

//------------------------------Fin Authentication

module.exports = router;