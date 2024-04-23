import React, { useState, useEffect } from "react";
import '../../Styles/Styles.css'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from 'sweetalert2'
import NavBar from '../Utils/NavBar'



function EditarPerfil() {
    const [cookies, setCookies] = useCookies(['usuario'])
    const [datosUser, setDatosUser] = useState(cookies.usuario)


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

    useEffect(() => {
        setNombres(datosUser.nombre)
        setApellidos(datosUser.apellidos)
        setFacultad(datosUser.facultad)
        setCarrera(datosUser.carrera)
        setCorreo(datosUser.correo)
        //setContraseña(datosUser.contraseña)
        console.log(datosUser);
        if (datosUser.genero === "Hombre") {
            setHombre(true)
            console.log("Cambiando:"+hombre);
            document.getElementById("maleGender").checked = true;

        } else if (datosUser.genero === "Mujer") {
            setMujer(true)
            document.getElementById("femaleGender").checked = true;
        } else {
            Swal.fire({
                icon: "error",
                title: "Ocurrio un error",
                showConfirmButton: false,
                timer: 1500
            });
            return
        }
    }, []);



    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Hombre:"+ hombre);
        console.log("Mujer:" +mujer);
        if (hombre) {
            genero = "Hombre"

        } else if (mujer) {
            genero = "Mujer"

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
            carnet: datosUser.carnet,
            nombre: nombres,
            apellidos: apellidos,

            facultad: facultad,
            carrera: carrera,
            correo: correo,
            contraseña: contraseña,
            genero: genero,
        }

        fetch('http://localhost:5000/actualizar', {
            method: "PUT",
            body: JSON.stringify(dataJson),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.mensaje) {
                    setCookies('usuario', dataJson)
                    console.log(res);
                    Swal.fire({
                        icon: "success",
                        title: res.mensaje,
                        showConfirmButton: false,
                        timer: 1500
                    });



                    //setCookies('usuario', dataUser)


                } else {
                    Swal.fire({
                        icon: "error",
                        title: res.error,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }).catch(((error) => console.error(error)))

    };

    return (
        <div>
            <NavBar />
            <div className="home-background ">

                <div className="container pt-5 centrado">
                    <div className="card  w-50">
                        <div className="card-header">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                            </svg> Editar perfil
                        </div>
                        <div className="card-body">

                            <form onSubmit={handleSubmit}>


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
                                        type="email"
                                        className="Input-no-Border  "
                                        id="floatInput"
                                        placeholder="Correo"
                                        onChange={(e) => setCorreo(e.target.value)}
                                        value={correo}
                                        required
                                    />
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
                                    <button type="submit" className="btn btn-primary ">Gaurdar Cambios</button>

                                </div>


                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarPerfil;