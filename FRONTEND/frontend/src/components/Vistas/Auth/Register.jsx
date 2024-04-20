import React, { useState } from "react";
import '../../Styles/Styles.css'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from 'sweetalert2'

function Register() {
    const [carnet, setCarnet] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')

    const [facultad, setFacultad] = useState('')
    const [carrera, setCarrera] = useState('')
    const [correo, setCorreo] = useState('')
    const [contraseña, setContraseña] = useState('')

    var genero;
    const [hombre, setHombre] = useState(false)
    const [mujer, setMujer] = useState(false)

    const Navegador = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (hombre) {
            genero = "Hombre"
            console.log(genero);
        } else if (mujer) {
            genero = "Mujer"
            console.log(genero);
        } else {
            Swal.fire({
                icon: "error",
                title: "Seleccione un genero",
                showConfirmButton: false,
                timer: 1500
            });
            return
        }

        const dataJson = {
            carnet: carnet,
            nombre: nombres,
            apellidos: apellidos,

            facultad: facultad,
            carrera: carrera,
            correo: correo,
            contraseña: contraseña,
            genero: genero,
        }

        fetch('http://localhost:5000/registro', {
            method: "POST",
            body: JSON.stringify(dataJson),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.mensaje) {
                    console.log(res);
                    Swal.fire({
                        icon: "success",
                        title: res.mensaje,
                        showConfirmButton: false,
                        timer: 1500
                    });



                    //setCookies('usuario', dataUser)

                    Navegador('/login')
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
        <div className="login-background">
            <div className="container bg-white  mt-5 rounded">
                <div className="row">
                    <div className="col text-center pt-5 imagen-Register ">
                        <div className="text-center pt-5  ">
                            <img className="w-50 h-50 " src={require('../../Images/ApertureLogo.png')} alt="" />
                        </div>
                    </div>
                    <div className="col  pt-3">
                        <h3 className="text-center mb-5 fw-bold">Crear Cuenta</h3>
                        <form onSubmit={handleSubmit}>

                            <div className="mb-4">

                                <div className="row">
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="Input-no-Border "
                                            id="floatInput"
                                            placeholder="Carnet"
                                            onChange={(e) => setCarnet(e.target.value)}
                                            value={carnet}
                                            required
                                        />
                                    </div>
                                    <div className="col">

                                        <input
                                            type="email"
                                            className="Input-no-Border  "
                                            id="floatInput"
                                            placeholder="Correo"
                                            onChange={(e) => setCorreo(e.target.value)}
                                            value={correo}
                                            required
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="mb-4">

                                <div className="row">
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="Input-no-Border"
                                            id="floatInput"
                                            placeholder="Nombres"
                                            onChange={(e) => setNombres(e.target.value)}
                                            value={nombres}
                                            required
                                        />
                                    </div>
                                    <div className="col">

                                        <input
                                            type="text"
                                            className="Input-no-Border"
                                            placeholder="Apellidos"
                                            id="floatInput"
                                            onChange={(e) => setApellidos(e.target.value)}
                                            value={apellidos}
                                            required
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="mb-4">

                                <div className="row">
                                    <div className="col">

                                        <input
                                            type="text"
                                            className="Input-no-Border"
                                            id="floatInput"
                                            placeholder="Facultad"
                                            onChange={(e) => setFacultad(e.target.value)}
                                            value={facultad}
                                            required
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="Input-no-Border"
                                            placeholder="Carrera"
                                            id="floatInput"
                                            onChange={(e) => setCarrera(e.target.value)}
                                            value={carrera}
                                            required

                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="mb-4">

                                <input
                                    type="password"
                                    className="Input-no-Border"
                                    id="floatInput"
                                    placeholder="Contraseña"
                                    onChange={(e) => setContraseña(e.target.value)}
                                    value={contraseña}
                                    required
                                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                                    title="Debe ingresar al menos 8 caracteres, unos minuscula (a), uno mayuscula (A) y un caracter especial (-)."
                                />
                            </div>

                            <div className="d-md-flex justify-content-start align-items-center mb-5">

                                <h6 className="mb-0 me-4">Genero: </h6>


                                <div className="form-check form-check-inline mb-0 me-4">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender"
                                        onChange={(e) => setHombre(e.target.value)}
                                        value={hombre} />
                                    <label className="form-check-label" htmlFor="maleGender">Hombre</label>
                                </div>

                                <div className="form-check form-check-inline mb-0 me-4">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender"
                                        onChange={(e) => setMujer(e.target.value)}
                                        value={mujer} />
                                    <label className="form-check-label" htmlFor="femaleGender">Mujer</label>
                                </div>


                            </div>
                            <div className="text-center mb-5 ">
                                <button type="submit" className="btn btn-primary ">Crear Cuenta</button>

                            </div>
                            <div className="mb-3">
                                <span>Ya tienes cuenta? <a href="" onClick={() => { Navegador('/login') }} >Iniciar Sesión</a></span><br />

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;