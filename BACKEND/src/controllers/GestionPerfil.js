const {list_users} = require('../Data/data');
const Usuario = require('../Models/Usuario');

function getUsers(req,res){
    try {
        return res.json({
            usuarios: list_users
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'Ocurrio un error al obtener los usuarios.'
        })
    }
   
}

function editar(req,res){
    try {
        const {carnet, nombre, apellidos, genero, facultad, carrera, correo, contraseña} = req.body;
        
        const usuarioActualizar= list_users.find(x_user => x_user.carnet === carnet);
        if (usuarioActualizar) {
            usuarioActualizar.nombre =nombre;
            usuarioActualizar.apellidos =apellidos;
            usuarioActualizar.genero =genero;
            usuarioActualizar.facultad =facultad;
            usuarioActualizar.carrera =carrera;
            usuarioActualizar.correo =correo;
            usuarioActualizar.contraseña =contraseña;
            return res.json({
                mensaje: 'Usuario actualizado correctamente.'
            })

        }else{
            return res.json({
                error: 'Usuario no encontrado.'
            })
        }
    
    
    
    
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'Ocurrio un error al actualizar el usuario.'
        })
    }
}

function eliminar(req,res){
    try {
        const carnet = req.body.carnet;
        const usuarioIndex =list_users.findIndex(x_user => x_user.carnet === carnet);
        
        if(usuarioIndex != -1){ 

            list_users.splice(usuarioIndex,1)
            return res.json({
                mensaje: 'Usuario eliminado correctamente.'
            })

        }else{
            console.log(error);
            return res.json({
                error: 'Usuario no encontrado.'
            })
        }


    } catch (error) {
        console.log(error);
        return res.json({
            error: 'Ocurrio un error al eliminar el usuario.'
        })
    }
}

function getContraseña(req,res){
    try {
        const carnet = req.body.carnet;
        const usuario =list_users.find(x_user => x_user.carnet === carnet);
        
        if(usuario){ 

            
            return res.json({
                contraseña: usuario.contraseña,
                mensaje: "Se encontró el recurso solicitado."
            })

        }else{
            console.log(error);
            return res.json({
                error: 'Usuario no encontrado.'
            })
        }


    } catch (error) {
        console.log(error);
        return res.json({
            error: 'Ocurrio un error inesperado.'
        })
    }
}

module.exports = {
    getUsers,
    editar,
    eliminar,
    getContraseña
}