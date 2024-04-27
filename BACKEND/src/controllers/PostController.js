
const { list_users, list_posts } = require('../Data/data');
const Comentario = require('../Models/Comentario');
const Post = require('../Models/Post')

var id_publicacion = 0;

function CrearPost(req, res) {
    try {
        const carnet = req.body.carnet
        const descripcion = req.body.descripcion
        const imagen = req.body.imagen
        const categoria = req.body.categoria
        const anonimo = req.body.anonimo

        const ultimo = list_posts[0]

        var id 
        if(!ultimo){
            id = 1
        }else{
            id =ultimo.id+1
        }
        
        const newPost = new Post(id, carnet, descripcion, imagen, categoria, anonimo)
        //list_posts.push(newPost)
        list_posts.unshift(newPost)
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


function GetAllPosts(req, res) {
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
                    user: usuario.nombre,
                    facultad: usuario.facultad,
                    carrera: usuario.carrera,
                    categoria: post.categoria,
                    anonimo: post.anonimo,
                    likes: post.likes.length,
                    comentarios: post.comentarios

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

function likePost(req, res) {
    try {
        const id = req.body.id;
        const id_user = req.body.id_user;

        const postDarLike = list_posts.find(post => post.id === id);
        if (postDarLike) {
            const likeIndex = postDarLike.likes.findIndex(usuarioId => usuarioId === id_user)
            if (likeIndex != -1) {
                postDarLike.likes.splice(likeIndex, 1)
                return res.json({
                    mensaje: 'Like eliminado.'
                })
            } else {
                postDarLike.likes.push(id_user)
                return res.json({
                    mensaje: 'Se le dio like al post correctamente.'
                })
            }
 


        } else {
            return res.json({
                error: 'Publicación no encontrada.'
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'Ocurrio un error al darle like a la publicación'
        })
    }
}

function comentarPost(req, res) {
    try {
        const id = req.body.id;
        const user_id = req.body.user;
        const texto = req.body.texto;

        const postComentar = list_posts.find(post => post.id === id);
        if (postComentar) {

            console.log("ID:" + user_id);
            console.log(list_users);
            const usuarioComentando = list_users.find(user => user.carnet === user_id);
            if (usuarioComentando) {
                const idComentario = postComentar.comentarios.length
                const comentario = new Comentario(idComentario + 1, usuarioComentando, texto)
                postComentar.comentarios.push(comentario);
                return res.json({
                    mensaje: 'Comentario Publicado'
                })
            } else {
                return res.json({
                    error: 'Usuario no encontrado.'
                })
            }






        } else {
            return res.json({
                error: 'Publicación no encontrada.'
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'Ocurrio un error al comentar la publicación.'
        })
    }
}

function eliminarPost(req, res) {
    try {
        const id = req.body.id;
        const publiIndex =list_posts.findIndex(publi_i => publi_i.id === id);
        
        if(publiIndex != -1){ 

            list_posts.splice(publiIndex,1)
            return res.json({
                mensaje: 'Publicación eliminada correctamente.'
            })

        }else{
            console.log(error);
            return res.json({
                error: 'Publicación no encontrada.'
            })
        }


    } catch (error) {
        console.log(error);
        return res.json({
            error: 'Ocurrio un error al eliminar la publicación.'
        })
    }

}

function GetTrendingPosts(req, res) {
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
                    user: usuario.nombre,
                    facultad: usuario.facultad,
                    carrera: usuario.carrera,
                    categoria: post.categoria,
                    anonimo: post.anonimo,
                    likes: post.likes.length,
                    comentarios: post.comentarios

                };

                posts_con_usuario.push(post_con_usuario);
            }
        }
        

        posts_con_usuario.sort(ordenar)
        //posts_con_usuario.splice(0,10)
        
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

function sumarLikeYCom(post){
    
    return post.likes + post.comentarios.length
    
}

function ordenar(a,b){
    const A = sumarLikeYCom(a);
    console.log("A"+A);
    const B = sumarLikeYCom(b);
    console.log("B"+B);
    return B - A;
}
module.exports = {
    CrearPost,
    GetAllPosts,
    likePost,
    comentarPost,
    eliminarPost,
    GetTrendingPosts
}
