
const { list_users } = require('../Data/data');
const Usuario = require('../Models/Usuario');

function CargaMasivaUsuarios(req, res) {
    try {

        const usersArray = req.body

        for (const userData of usersArray) {
            const { carnet, nombres, apellidos, genero, facultad, carrera, correo, contrasenia } = userData;
            var gen 
            if(genero === "M"){
                gen = "Hombre"
            }else if(genero === "F"){
                gen = "Mujer"
            }
            const usuarioExiste = list_users.find(x_user => x_user.carnet === carnet);

            if (usuarioExiste) {

            }else{
                const newUser = new Usuario(carnet, nombres, apellidos, gen, facultad, carrera, correo, contrasenia);
                list_users.push(newUser);
            }


        }


        return res.json({
            mensaje: 'Datos agregados correctamente.'
        })


    } catch (error) {
        console.log(error);
        return res.json({
            error: 'Ocurrio un error al cargar los datos.'
        })
    }
}



module.exports = {
    CargaMasivaUsuarios
}