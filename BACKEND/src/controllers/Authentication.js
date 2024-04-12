
const {list_users} = require('../Data/data');
const Usuario = require('../Models/Usuario');

function SingUp(req,res){
    try {
        const {carnet, nombre, apellidos, genero, facultad, carrera, correo, contraseña} = req.body;
 
        //Verificar Carnet Disponible
        const usuarioExiste= list_users.find(x_user => x_user.carnet === carnet);

        if (usuarioExiste) {
            return res.json({
                error: 'Carnet ya esta en uso'
            })
        }
 
        const newUser = new Usuario(carnet, nombre, apellidos, genero, facultad, carrera, correo, contraseña);
        list_users.push(newUser);
        return res.json({
            mensaje:'Usuario agregado correctamente'
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'Ocurrio un error en el registro de usuario.'
        })
    }
}


function login(req,res){
    try {
        const {carnet,contraseña} = req.body
        const usuarioLogin = list_users.find(x_user => x_user.carnet === carnet && x_user.contraseña === contraseña);
        if(usuarioLogin){
            const datos = {
                carnet: usuarioLogin.carnet,
                nombre: usuarioLogin.nombre,
                apellidos: usuarioLogin.apellidos,
                genero: usuarioLogin.genero,
                facultad: usuarioLogin.facultad,
                carrera: usuarioLogin.carrera,
                correo: usuarioLogin.correo
            }

            return res.json({
                encontrado:true,
                mensaje: 'Logeado correctamente',
                datos
            })
        }else{
            return res.json({
                encontrado:false,
                error: 'Credenciales incorrectas'
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'Ocurrio un error al iniciar sesion.'
        })
    }
}

module.exports = {
    SingUp,
    login
}