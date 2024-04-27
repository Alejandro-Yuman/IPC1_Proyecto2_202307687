
const { list_users, list_posts } = require('../Data/data');


function mostUsersPosts(req, res) {
    try {
        const postCountByUser = {}

        for (const post of list_posts) {

            if (post.user in postCountByUser) {
                postCountByUser[post.user]++
            } else {
                postCountByUser[post.user] = 1
            }
        }

        const listaCount = Object.keys(postCountByUser).map(user => ({
            user,
            post: postCountByUser[user]
        }))


        listaCount.sort((a, b) => b.post - a.post)

        const top = listaCount.splice(0, 10)


        res.json({
            topBar: top
        })

    } catch (error) {
        console.log(error);
        return res.json({
            error: 'Ocurrio un error inesperado.'
        })
    }
}

function mostLikedPost(req, res) {
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
                    likes: post.likes,
                    comentarios: post.comentarios

                };  

                posts_con_usuario.push(post_con_usuario);
            }
        }



        const listaLikes = posts_con_usuario
        for (const iterator of listaLikes) {
            console.log(iterator.likes.length);
        }
        listaLikes.sort((a, b) => b.likes.length - a.likes.length)

        const top = listaLikes.splice(0, 5)
        console.log(top);
        res.json({
            likesPost: top
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'Ocurrio un error inesperado.'
        })
    }
}

function postByCategoryia(req, res) {
    try {
        const postCountByCat = {}

        for (const post of list_posts) {

            if (post.categoria in postCountByCat) {
                postCountByCat[post.categoria]++
            } else {
                postCountByCat[post.categoria] = 1
            }
        }

        const listaCount = Object.keys(postCountByCat).map(categoria => ({
            categoria,
            cant: postCountByCat[categoria]
        }))


        listaCount.sort((a, b) => b.cant - a.cant)

        const top = listaCount.splice(0, 10)


        res.json({
            topCat: top
        })

    } catch (error) {
        console.log(error);
        return res.json({
            error: 'Ocurrio un error inesperado.'
        })
    }
}

module.exports = {
    mostUsersPosts,
    mostLikedPost,
    postByCategoryia
}
