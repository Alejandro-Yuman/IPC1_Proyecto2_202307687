
import React, { useState } from "react";
import '../../Styles/Styles.css'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from 'sweetalert2'

function IniciarSesion() {
    const [carnet, setCarnet] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [cookies, setCookies] = useCookies(['usuario'])

    const Navegador = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (carnet === "12024" && contraseña === "@dminIPC1") {
            const dataUser = {
                carnet: "12024",
                nombre: "Ayeser Cristian",
                apellidos: "Oxlaj Juárez",
                genero: "Masculino",
                facultad: "Ingeniería",
                carrera: "Ingeniería en Ciencias y Sistemas",
                correo: "ipc11s2024@email.com",
                contraseña: "@dminIPC1"
            }
            Swal.fire({
                icon: "success",
                title: "Logeado correctamente Administrador",
                showConfirmButton: false,
                timer: 1500
            });
            setCookies('usuario', dataUser)
            Navegador('/mainAdmin')
        } else {

            const dataJson = {
                carnet: carnet,
                contraseña: contraseña
            }

            fetch('http://localhost:5000/login', {
                method: "POST",
                body: JSON.stringify(dataJson),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.encontrado) {
                        const dataUser = res.datos;
                        Swal.fire({
                            icon: "success",
                            title: res.mensaje + " " + dataUser.nombre,
                            showConfirmButton: false,
                            timer: 1500
                        });



                        setCookies('usuario', dataUser)

                        Navegador('/home')
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


    }



    return (
        <div className="login-background">
            <div className="container w-75 mt-5 bg-white rounded">
                <div className="row ">
                    <div className="col imagen-Login ">
                        <div className="text-center pt-5 pb-4 ">
                            <img className="w-50 h-50 " src={require('../../Images/ApertureLogo.png')} alt="" />
                        </div>
                        <h2 className="text-white pt-5 mt-5 text-center">Conectando personas <br />Creando comunidades.</h2>
                    </div>
                    <div className="col">
                        <h2 className="fw-bold text-center py-5">Bienvenido</h2>

                        <form onSubmit={handleSubmit}>

                            <div className="form-floating mb-5">
                                <input
                                    type="text"
                                    className="Input-no-Border"
                                    id="floatInput"
                                    placeholder="Carnet"
                                    onChange={(e) => setCarnet(e.target.value)}
                                    value={carnet}
                                />

                            </div>

                            <div className="form-floating mb-5">

                                <input
                                    type="password"
                                    className="Input-no-Border  "
                                    id="floatInput"
                                    placeholder="Contraseña"
                                    onChange={(e) => setContraseña(e.target.value)}
                                    value={contraseña}
                                />
                                
                            </div>


                            <div className="text-center py-5">
                                <button type="submit" className="btn btn-primary ">Iniciar Sesión</button>
                            </div>



                            <div className="my-3">
                                <span>No tienes cuenta? <a href="" onClick={() => { Navegador('/register') }} >Regístrate</a></span><br />

                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default IniciarSesion;