import React, { useState, useEffect } from "react";
import '../../Styles/Styles.css'
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from 'sweetalert2'
import NavBar from '../Utils/NavBar'
import { Modal } from "react-bootstrap";

function Home() {
    const [cookies, setCookies] = useCookies(['usuario'])
    const [datosUser, setDatosUser] = useState(cookies.usuario)
    const [listaObjetos, setListaObjetos] = useState([])
    const [actualizarPost, setActualizarPost] = useState(false)

    const [selectedPost, setSelectedPost] = useState(null)

    const [comentario, setComentario] = useState('')

    useEffect(() => {

        fetch(`http://localhost:5000/getAllPosts`, {
            method: "GET", // Utiliza el método POST
            headers: {
                "Content-Type": "application/json", // Establece el tipo de contenido de la solicitud como JSON
            },
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res.publicaciones);
                setListaObjetos(res.publicaciones)

            })
            .catch((error) => console.error(error))
    }, [actualizarPost]);

    function viewIdPost(postId) {
        console.log("ID del post:", postId);
    }

    const postView = (post) => {
        console.log("Click" + JSON.stringify(post.comentarios));
        setSelectedPost(post)
    }

    const closePostView = () => {
        setSelectedPost(null)
    }

    function darLikePost(postId) {

        const dataJson = {
            id: postId,
            id_user: datosUser.carnet

        }
        fetch('http://localhost:5000/darLike', {
            method: "PUT",
            body: JSON.stringify(dataJson),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.mensaje) {
                    setActualizarPost(!actualizarPost);
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


    function comentarPost(postId, texto) {

        const dataJson = {
            id: postId,
            user: datosUser.carnet,
            texto: texto

        }
        fetch('http://localhost:5000/comentar', {
            method: "PUT",
            body: JSON.stringify(dataJson),
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
                    setActualizarPost(!actualizarPost);
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
            <NavBar />
            <div className="home-background ">
                {listaObjetos.map(objeto => (
                    <div>

                        <div className="container centrado py-4" >

                            <div className="card w-50" key={objeto.id}>
                                <div className="card-body">
                                    {objeto.anonimo &&
                                        <div>
                                            <h4 className="card-title">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-lock" viewBox="0 0 16 16">
                                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
                                                </svg> Usuario anónimo  </h4>
                                            <h6> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-award-fill" viewBox="0 0 16 16">
                                                <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864z" />
                                                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
                                            </svg> Universidad de San Carlos de Guatemala</h6>
                                        </div>

                                    }
                                    {!objeto.anonimo &&
                                        <div>
                                            <h4 className="card-title">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                                </svg> {objeto.user} </h4>
                                            <h6><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-award-fill" viewBox="0 0 16 16">
                                                <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864z" />
                                                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
                                            </svg> {objeto.carrera} ({objeto.facultad}) </h6>
                                        </div>

                                    }

                                    <h6 className="card-title">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tags-fill" viewBox="0 0 16 16">
                                            <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                                            <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z" />
                                        </svg> {objeto.categoria} </h6>

                                    <p className="card-text"><small className="text-muted">{new Date(objeto.fechaHora).toLocaleString()}</small></p>
                                    <p className="card-text">{objeto.descripcion}</p>

                                </div>
                                <div className="">
                                    {objeto.imagen && <img src={objeto.imagen} className="card-img-bottom" alt="..." />}
                                </div>

                                <div className="card-footer mt-2">
                                    <div className="row">
                                        <div className="col">
                                            <div className="">
                                                <button onClick={() => darLikePost(objeto.id)} type="button" className="btn btn-outline-success" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                                    </svg> {objeto.likes}
                                                </button>

                                            </div>

                                        </div>
                                        <div className="col">
                                            <div className="derecha">
                                                <button onClick={() => { postView(objeto) }} type="button" className="btn btn-outline-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left" viewBox="0 0 16 16">
                                                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                </svg> Comentarios
                                                </button>
                                            </div>
                                        </div>


                                    </div>



                                </div>

                            </div>
                        </div>



                    </div>


                ))}

            </div>


            {selectedPost &&
                <Modal show={true} onHide={closePostView} backdrop="static" keyboard={false} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Comentarios</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" className="scrollspy-example" tabIndex="0">
                            
                            {selectedPost.comentarios.map(comentario => (
                                <div className="row">
                                    <div className="col-1 pt-4 centrado">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                    </svg>
                                    </div>
                                <div className="card mt-2 col-11" >
                                    
                                    <div className="card-body">
                                        

                                        <h5 className="card-title"> {comentario.user.nombre} {comentario.user.apellidos}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{comentario.user.carrera} ({comentario.user.facultad})</h6>
                                        <p className="card-text">{comentario.texto}</p>


                                    </div>
                                </div>
                                </div>
                            ))}

                        </div>

                    </Modal.Body>

                    <Modal.Footer >

                        <div className="row w-100">
                            <div className="col ">
                                <input
                                    type="text"
                                    className="Input-no-Border "
                                    id="floatInput"
                                    placeholder="Comentario"
                                    onChange={(e) => setComentario(e.target.value)}
                                    value={comentario}
                                    required
                                />
                            </div>
                            <div className="col-1">
                                <button onClick={() => { comentarPost(selectedPost.id, comentario) }} className="btn btn-primary" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                                    </svg>
                                </button>
                            </div>
                        </div>




                    </Modal.Footer>
                </Modal>

            }



        </div >
    )
}

export default Home;