class Post{
    constructor(id, user, descripcion, imagen, categoria, anonimo){
        this.id = id
        this.user = user
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.fechaHora = new Date();
        this.categoria = categoria;
        this.anonimo = anonimo;
        this.likes = []
        this.comentarios=[]
    }
}


module.exports = Post;