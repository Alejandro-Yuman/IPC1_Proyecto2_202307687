
const {list_users,list_posts} = require('../Data/data');
const Post = require('../Models/Post')

var id_publicacion = 0;

function CrearPost(req,res){
    try {
        const carnet = req.body.carnet
        const descripcion = req.body.descripcion
        const imagen = req.body.imagen

        id_publicacion = id_publicacion + 1
        const newPost = new Post(id_publicacion, carnet, descripcion, imagen)
        list_posts.push(newPost)
        res.json(
            { mensaje: 'Post creado exitosamente correctamente.' }

        );
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'Ocurrio un error al crear el Post'
        })
    }
}


function GetAllPosts(req,res){
    try {
        const posts_con_usuario = [];

        for (const post of list_posts) {

            const usuario = list_users.find(user => user.carnet === post.user);

            

            if (usuario) {
                const post_con_usuario = {
                    id: post.id,
                    descripcion: post.descripcion,
                    imagen: post.imagen,
                    fechaHora: post.fechaHora,
                    user: usuario.nombre
                };

                posts_con_usuario.push(post_con_usuario);
            }
        }


        res.json(
            { publicaciones: posts_con_usuario }
        );


    } catch (error) {
        console.log(error);
        return res.json({
            error: 'Ocurrio un error al obtener los Posts'
        })
    }
}
module.exports = {
    CrearPost,
    GetAllPosts
}
