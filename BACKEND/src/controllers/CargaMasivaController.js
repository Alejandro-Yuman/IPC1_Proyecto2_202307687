
const { list_users, list_posts } = require('../Data/data');
const Usuario = require('../Models/Usuario');
const Post = require('../Models/Post')

function CargaMasivaUsuarios(req, res) {
    try {

        const usersArray = req.body

        for (const userData of usersArray) {
            const { carnet, nombres, apellidos, genero, facultad, carrera, correo, contrasenia } = userData;
            var gen
            if (genero === "M") {
                gen = "Hombre"
            } else if (genero === "F") {
                gen = "Mujer"
            }
            const usuarioExiste = list_users.find(x_user => x_user.carnet === carnet);

            if (usuarioExiste) {

            } else {
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

function CargaMasivaPublicaciones(req, res) {
    try {

        const postsArray = req.body

        for (const postData of postsArray) {
            const { codigo, descripcion, categoria, anonimo } = postData;

            const usuarioExiste = list_users.find(x_user => x_user.carnet === codigo);

            if (usuarioExiste) {
                const ultimo = list_posts[0]

                var id 
                if(!ultimo){
                    id = 1
                }else{
                    id =ultimo.id+1
                }

                const newPost = new Post(id, codigo, descripcion, null, categoria, anonimo)
                list_posts.unshift(newPost)
                //list_posts.push(newPost)
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
    CargaMasivaUsuarios,
    CargaMasivaPublicaciones
}