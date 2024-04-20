import React, { useState } from "react";
import '../../Styles/Styles.css'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from 'sweetalert2'
import NavBar from '../Utils/NavBar'


function EditarPerfil() {
    const [cookies] = useCookies(['usuario']);
    const [datosUser, setDatosUser] = useState(cookies.usuario)


    const handleSubmit = (event) => {
        event.preventDefault();

        const dataJson = {

        }

        fetch(`http://localhost:5000/crearPost`, {
            method: "POST",
            body: JSON.stringify(dataJson),
            headers: {
                "Content-Type": "application/json",
            },
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
                } else {
                    Swal.fire({
                        icon: "error",
                        title: res.error,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }

            })
            .catch((error) => console.error(error))

    };

    return (
        <div>
            <NavBar />
            <div className="home-background ">
 
            </div>
        </div>
    )
}

export default EditarPerfil;