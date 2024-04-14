
import React, { useState } from "react";
import './Styles/Styles.css'

function IniciarSesion() {
    const [carnet, setCarnet] = useState('')
    const [contraseña, setContraseña] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();

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
                    alert(res.mensaje + " " + dataUser.nombre)
                } else {
                    alert(res.error)
                }
            }).catch(((error) => console.error(error)))
    }

    return (
    <div className="login-background">
        <div className="container w-75 mt-5 bg-white">
            <div className="row ">
                <div className="col imagen-Login ">
                    <div className="text-center pt-5 pb-4">
                        <img className="w-50 h-50" src={require('./Images/ApertureLogo.png')} alt="" />
                    </div>
                    <h2 className="text-white pt-5 mt-5 text-center">WE DO WHAT WE MUST<br /> BACAUSE WE CAN</h2>
                </div>
                <div className="col">
                    <h2 className="fw-bold text-center py-5">Bienvenido</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatInput"
                                placeholder="Carnet"
                                onChange={(e) => setCarnet(e.target.value)}
                                value={carnet}
                            />
                            <label >Carnet</label>
                        </div>

                        <div className="form-floating mb-3">

                            <input
                                type="password"
                                className="form-control"
                                id="floatInput"
                                placeholder="Carnet"
                                onChange={(e) => setContraseña(e.target.value)}
                                value={contraseña}
                            />
                            <label>Contraseña</label>
                        </div>


                        <div className="text-center py-5">
                            <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                        </div>



                        <div className="my-3">
                            <span>No tienes cuenta? <a href="#">Regístrate</a></span><br />
                            <span><a href="#">Recuperar Contraseña</a></span>

                        </div>

                    </form>
                </div>
            </div>

        </div>
    </div>
    )
}


export default IniciarSesion;