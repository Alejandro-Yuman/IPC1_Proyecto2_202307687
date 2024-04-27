const express = require("express");

const router = express.Router();
const{hello} = require('../controllers/holamundo');
const {SingUp ,login} = require('../controllers/Authentication')
const {getUsers,editar ,eliminar,getContraseña} = require('../controllers/GestionPerfil')
const {CrearPost,GetAllPosts,likePost,comentarPost, eliminarPost} = require('../controllers/PostController')
const {CargaMasivaUsuarios,CargaMasivaPublicaciones} = require('../controllers/CargaMasivaController')
const {mostUsersPosts, mostLikedPost,postByCategoryia} = require('../controllers/ChartsController')

//------------------------------Rutas
router.get('/mensaje',hello);


//------------------------------Authentication

//Get
router.get('/obtenerUsuarios',getUsers)


//Post
router.post('/registro',SingUp)
router.post('/login',login)
router.post('/getContrasenia',getContraseña)

//Put
router.put('/actualizar',editar)

//Delete  
router.delete('/eliminar',eliminar)

//------------------------------Fin Authentication

//------------------------------Post
   
//Get
router.get('/getAllPosts',GetAllPosts)

//Post
router.post('/crearPost',CrearPost)

//Put
router.put('/darLike',likePost);
router.put('/comentar',comentarPost)


//Delete  
router.delete('/eliminarPost',eliminarPost)
//------------------------------Fin Post

//------------------------------Carga Masiva

//Post
router.post('/cargaMasivaUsuarios', CargaMasivaUsuarios)
router.post('/CargaMasivaPublicaciones', CargaMasivaPublicaciones)

//------------------------------Fin Carga Masiva

//------------------------------ Charts

//GET
router.get('/mostUserPosts',mostUsersPosts)
router.get('/mostLikedPost',mostLikedPost)
router.get('/postByCat',postByCategoryia)

//------------------------------Fin Charts
module.exports = router;