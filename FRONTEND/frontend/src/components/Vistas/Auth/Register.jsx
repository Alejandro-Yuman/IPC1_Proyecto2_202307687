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

        if(hombre){
            genero = "Hombre"
            console.log(genero);
        }else if(mujer){
            genero = "Mujer"
            console.log(genero);
        }else{
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
            <div className="container w-75 mt-5 bg-white">
                <form onSubmit={handleSubmit}>
                    <h2 className="fw-bold text-center py-3">Crear Cuenta</h2>

                    <div className="row ">

                        <div className="col">

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatInput"
                                    placeholder="Carnet"
                                    onChange={(e) => setCarnet(e.target.value)}
                                    value={carnet}
                                    required
                                />
                                <label >Carnet</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatInput"
                                    placeholder="Nombre"
                                    onChange={(e) => setNombres(e.target.value)}
                                    value={nombres}
                                    required
                                />
                                <label >Nombre</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatInput"
                                    placeholder="Facultad"
                                    onChange={(e) => setFacultad(e.target.value)}
                                    value={facultad}
                                    required
                                />
                                <label >Facultad</label>
                            </div>

                            <div className="form-floating mb-3">

                                <input
                                    type="password"
                                    className="form-control"
                                    id="floatInput"
                                    placeholder="Carnet"
                                    onChange={(e) => setContraseña(e.target.value)}
                                    value={contraseña}
                                    required
                                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                                    title="Debe ingresar al menos 8 caracteres, unos minuscula (a), uno mayuscula (A) y un caracter especial (-)."
                                />
                                <label>Contraseña</label>
                            </div>


                        </div>


                        <div className="col">

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatInput"
                                    placeholder="Correo"
                                    onChange={(e) => setCorreo(e.target.value)}
                                    value={correo}
                                    required
                                />
                                <label >Correo</label>
                            </div>



                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatInput"
                                    placeholder="Apellidos"
                                    onChange={(e) => setApellidos(e.target.value)}
                                    value={apellidos}
                                    required
                                />
                                <label >Apellidos</label>
                            </div>

                            <div className="form-floating mb-3">

                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatInput"
                                    placeholder="Carnet"
                                    onChange={(e) => setCarrera(e.target.value)}
                                    value={carrera}
                                    required

                                />
                                <label>Carrera</label>
                            </div>




                            <div className="d-md-flex justify-content-start align-items-center mb-1 py-2">

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






                        </div>
                    </div>
                    <div className="text-center py-3">
                        <button type="submit" className="btn btn-primary ">Crear Cuenta</button>
                    </div>

                    <div className="pt-3 text-center">
                        <span>Ya tienes cuenta? <a href="" onClick={() => { Navegador('/login') }} >Iniciar Sesión</a></span><br />

                    </div>
                </form>
                <div className="w-50 h-50 pb-3">
                    <img className="w-25 h-25" src={require('../../Images/LogoNegro.png')} alt="" />
                </div>

            </div>
        </div>
    )
}

export default Register;