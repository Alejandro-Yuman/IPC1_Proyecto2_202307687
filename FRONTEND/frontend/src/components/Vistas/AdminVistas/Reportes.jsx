import React, { useState, useEffect } from "react";
import '../../Styles/Styles.css'
import { useCookies } from "react-cookie";
import { Modal } from "react-bootstrap";
import Swal from 'sweetalert2'
import NavBarAdmin from '../Utils/NavBarAdmin'
import ReporteBar from '../Charts/Bar'
import LikedPostChart from '../Charts/LikedPostChart';
import Carousel from 'react-bootstrap/Carousel';
import PostByCat from '../Charts/PostByCat'

function Reportes() {
    const [cookies, setCookies] = useCookies(['usuario'])
    const [datosUser, setDatosUser] = useState(cookies.usuario)

    const [lista, setLista] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/mostLikedPost', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((res) => {
                
                setLista(res.likesPost)

            }).catch(((error) => console.error(error)))

    }, [])

    return (
        <div>
            <NavBarAdmin />
            <div className="home-background">
                <h1 className="fw-bold text-center pt-3 text-white">Reportes</h1>

                <div className="container">
                    <div className="row bg-white ">

                        <div className="col">

                            <div className="card my-3 " >
                                <div className="card-body">
                                    <h5 className="card-title">Top 5 de post con más likes. </h5>
                                    <LikedPostChart />

                                </div>
                            </div>

                        </div>

                        <div className="col-6">
                            <div className="card my-3 " >
                                <div className="card-body">
                                    {lista &&

                                        <Carousel indicators={false} data-bs-theme="dark">
                                            {lista.map(objeto => (
                                                <Carousel.Item>
                                                    <div>
                                                        <h6>{objeto.id}</h6>
                                                        <h4>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                                            </svg> {objeto.user} </h4>
                                                        <h6><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-award-fill" viewBox="0 0 16 16">
                                                            <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864z" />
                                                            <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
                                                        </svg> {objeto.carrera} ({objeto.facultad}) </h6>
                                                    </div>
                                                    <h6 className="card-title">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tags-fill" viewBox="0 0 16 16">
                                                            <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                                                            <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z" />
                                                        </svg> {objeto.categoria} </h6>

                                                    <p className="card-text"><small className="text-muted">{new Date(objeto.fechaHora).toLocaleString()}</small></p>
                                                    <p className="card-text">{objeto.descripcion}</p>
                                                    <div className="">
                                                        {objeto.imagen && <img src={objeto.imagen} className="card-img-bottom" alt="..." />}
                                                    </div>
                                                </Carousel.Item>
                                            ))
                                            }



                                        </Carousel>
                                    }


                                </div>
                            </div>

                        </div>
                        <div className="col">
                            <div className="card my-3" >
                                <div className="card-body">
                                    <h5 className="card-title">Cantidad de posts por categorías.</h5>
                                    <PostByCat />

                                </div>
                            </div>

                        </div>
                        <div className="col">
                            <div className="card my-3" >
                                <div className="card-body">
                                    <h5 className="card-title">Top 10 usuarios con más publicaciones creadas. </h5>
                                    <ReporteBar />

                                </div>
                            </div>

                        </div>

                    </div>
                </div>







            </div>



        </div>
    )
}


export default Reportes;