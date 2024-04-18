import React, { useState } from "react";
import '../../Styles/Styles.css'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from 'sweetalert2'

function PrimeraPagina() {
    const Navegador = useNavigate();

    return (
        <div className="login-background">
            <div className="container w-75 mt-5 bg-white rounded">
                <div className="row ">
                    <div className="col">
                        <div className="text-center pt-3">
                            <img className="w-50 h-50" src={require('../../Images/LogoNegro.png')} alt="" />
                        </div>
                        <h4 className="pt-5 text-center">UNIMOS MENTES BRILLANTES EN UNA SOLA COMUNIDAD</h4>
                        <div className="text-center pt-3 pb-5" >
                            <img className="w-25 h-25 rounded" src={require('../../Images/CaveJohnson.png')} alt="" />
                        </div>
                        <h6 className="text-center mb-5">Contacto de Soporte: 3016193600101@ingenieria.usac.edu.gt</h6>
                    </div>
                    <div className="col">
                        <h4 className="fw-bold text-center py-5">Información Personal</h4>
                        <h5 className="text-center">Nombre: Rene Alejandro Yuman Barco</h5>
                        <h5 className="text-center">Carné: 202307687</h5>
                        <div className="text-center pt-5">
                            <button className="btn btn btn-outline-primary " onClick={() => { Navegador('/login') }} >Ir al Login</button>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PrimeraPagina;