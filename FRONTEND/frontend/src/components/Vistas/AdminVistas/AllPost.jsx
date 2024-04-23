import React, { useState, useEffect } from "react";
import '../../Styles/Styles.css'
import { useCookies } from "react-cookie";
import { Modal } from "react-bootstrap";
import Swal from 'sweetalert2'
import NavBarAdmin from '../Utils/NavBarAdmin'


function AllPost() {
    const [cookies, setCookies] = useCookies(['usuario'])
    const [datosUser, setDatosUser] = useState(cookies.usuario)


    const [selectedPost, setSelectedPost] = useState(null)

    const [actualizarTabla, setActualizarTabla] = useState(false)

    const [listaObjetos, setListaObjetos] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/getAllPosts', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                setListaObjetos(res.publicaciones)
            }).catch(((error) => console.error(error)))

    }, [actualizarTabla])

    const postView = (post) => {
        setSelectedPost(post)
    }

    const closePostView = () => {
        setSelectedPost(null)
    }

    const deletePost = (id) => {
        const myJson = {
            id: id
        }

        fetch('http://localhost:5000/eliminarPost', {
            method: "DELETE",
            body: JSON.stringify(myJson),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.mensaje) {
                    Swal.fire({
                        icon: "success",
                        title: res.mensaje,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setActualizarTabla(!actualizarTabla)
                } else {
                    Swal.fire({
                        icon: "error",
                        title: res.error,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            }).catch(((error) => console.error(error)))
    }


    return (
        <div>
            <NavBarAdmin />
            <div className="home-background">
                <h1 className="fw-bold text-center pt-3 text-white">Publicaciones</h1>

                <div className="container ">
                    <button type="button" class="btn btn-secondary mb-2">Exportar como CSV</button>
                    <table className="table table-striped pt-5">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">User</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Visibilidad</th>
                                <th scope="col">Likes</th>
                                <th scope="col">Comentarios</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaObjetos.map(post => (
                                    <tr>

                                        <td>{post.id}</td>
                                        <td>{post.user}</td>
                                        <td>{post.descripcion}</td>
                                        <td>{post.categoria}</td>
                                        {post.anonimo &&
                                            <td>Anonimo</td>

                                        }
                                        {!post.anonimo &&
                                            <td>Publico</td>

                                        }

                                        <td className="text-center">{post.likes}</td>
                                        <td className="text-center">{post.comentarios.length}</td>
                                        <td>
                                            <button className="btn btn-outline-primary m-1" onClick={() => { postView(post) }}>Ver</button>
                                            <button className="btn btn-outline-danger m-1" onClick={() => { deletePost(post.id) }}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>


                {selectedPost && (
                    <Modal show={true} onHide={closePostView} backdrop="static" keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Detalles de la publicación</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>ID: {selectedPost.id}</p>
                            <p>Usuario: {selectedPost.user}</p>
                            <p>Descripcion: {selectedPost.descripcion}</p>
                            {selectedPost.imagen && <img src={selectedPost.imagen} className="card-img-bottom" alt="..." />}

                            <p>Categoria: {selectedPost.categoria}</p>
                            {selectedPost.anonimo &&
                                <p>Visibilidad: Anonimo</p>
                            }
                            {!selectedPost.anonimo &&

                                <p>Visibilidad: Publico</p>

                            }

                            <p>Likes: {selectedPost.likes}</p>
                            <p>Comentarios: {selectedPost.comentarios.length}</p>

                        </Modal.Body>

                        <Modal.Footer>
                            <button className="btn btn-primary" onClick={closePostView}>
                                Cerrar
                            </button>
                        </Modal.Footer>
                    </Modal>
                )
                }
            </div>



        </div>
    )
}


export default AllPost;