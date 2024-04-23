import React, { useState, useEffect } from "react";
import '../../Styles/Styles.css'
import { useCookies } from "react-cookie";
import { Modal } from "react-bootstrap";
import Swal from 'sweetalert2'
import NavBarAdmin from '../Utils/NavBarAdmin'


function CargaMasiva() {
    const [cookies, setCookies] = useCookies(['usuario'])
    const [datosUser, setDatosUser] = useState(cookies.usuario)

    const [actualizarTabla, setActualizarTabla] = useState(false)

    const [listaObjetos, setListaObjetos] = useState([])


    const [selectedFile, setSelectedFile] = useState(null)


    const cargarDatos = async ()=>{
        if (!selectedFile) {
            Swal.fire({
                icon: "error",
                title: "Por favor, seleccione un archivo",
                showConfirmButton: false,
                timer: 1500
            });  
            return
        }

        const jsonData = await selectedFile.text()
        const userArray =JSON.parse(jsonData)

        fetch('http://localhost:5000/cargaMasivaUsuarios', {
            method: "POST",
            body: JSON.stringify(userArray),
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

    const handleFileChange = async(event) => {
        setSelectedFile(event.target.files[0])
        const jsonData = await event.target.files[0].text()
        setListaObjetos(JSON.parse(jsonData))
    }



    return (
        <div>
            <NavBarAdmin />
            <div className="home-background">
                <h1 className="fw-bold text-center pt-3 text-white">Carga Masiva de Usuarios</h1>

                <div className="container pt-3">
                    <div className="container mb-2">
                        <input type="file" className="mb-2 text-white fw-bold "  accept=".json" onChange={handleFileChange} />
                        <button type="button" class="btn btn-secondary mx-4" onClick={cargarDatos}>Cargar Archivo</button>
                    </div>
                    <table className="table table-striped pt-5">
                        <thead>
                            <tr>
                                <th scope="col">Carnet</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellidos</th>
                                <th scope="col">Genero</th>
                                <th scope="col">Facultad</th>
                                <th scope="col">Carrera</th>
                                <th scope="col">Correo</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaObjetos.map(user => (
                                    <tr>


                                        <td>{user.carnet}</td>
                                        <td>{user.nombres}</td>
                                        <td>{user.apellidos}</td>
                                        <td>{user.genero}</td>
                                        <td>{user.facultad}</td>
                                        <td>{user.carrera}</td>
                                        <td>{user.correo}</td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>



        </div>
    )
}


export default CargaMasiva;