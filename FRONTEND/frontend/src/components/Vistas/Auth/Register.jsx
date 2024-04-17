import React, { useState } from "react";
import '../../Styles/Styles.css'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from 'sweetalert2'

function Register() {
    const Navegador = useNavigate();

    return (
        <div className="login-background">
            <div className="container w-75 mt-5 bg-white">
                <form>
                    <h2 className="fw-bold text-center py-3">Crear Cuenta</h2>

                    <div className="row ">

                        <div className="col">

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatInput"
                                    placeholder="Carnet"
                                />
                                <label >Carnet</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatInput"
                                    placeholder="Nombre"
                                />
                                <label >Nombre</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatInput"
                                    placeholder="Facultad"
                                />
                                <label >Facultad</label>
                            </div>

                            <div className="form-floating mb-3">

                                <input
                                    type="password"
                                    className="form-control"
                                    id="floatInput"
                                    placeholder="Carnet"

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
                                />
                                <label >Correo</label>
                            </div>



                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatInput"
                                    placeholder="Apellidos"
                                />
                                <label >Apellidos</label>
                            </div>

                            <div className="form-floating mb-3">

                                <input
                                    type="password"
                                    className="form-control"
                                    id="floatInput"
                                    placeholder="Carnet"

                                />
                                <label>Carrera</label>
                            </div>




                            <div class="d-md-flex justify-content-start align-items-center mb-1 py-2">

                                <h6 class="mb-0 me-4">Genero: </h6>


                                <div class="form-check form-check-inline mb-0 me-4">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender"
                                        value="option2" />
                                    <label class="form-check-label" for="maleGender">Hombre</label>
                                </div>

                                <div class="form-check form-check-inline mb-0 me-4">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender"
                                        value="option1" />
                                    <label class="form-check-label" for="femaleGender">Mujer</label>
                                </div>


                            </div>






                        </div>
                    </div>
                    <div className="text-center py-3">
                        <button type="submit" class="btn btn-primary ">Crear Cuenta</button>
                    </div>

                    <div className="pt-3 text-center">
                        <span>Ya tienes cuenta? <a href="" onClick={() => { Navegador('/login') }} >Regístrate</a></span><br />

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