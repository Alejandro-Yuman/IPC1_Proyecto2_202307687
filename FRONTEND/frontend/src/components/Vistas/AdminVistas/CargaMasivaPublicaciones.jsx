import React, { useState, useEffect } from "react";
import '../../Styles/Styles.css'
import { useCookies } from "react-cookie";
import { Modal } from "react-bootstrap";
import Swal from 'sweetalert2'
import NavBarAdmin from '../Utils/NavBarAdmin'


function CargaMasivaPublicaciones() {
    const [cookies, setCookies] = useCookies(['usuario'])
    const [datosUser, setDatosUser] = useState(cookies.usuario)

    const [actualizarTabla, setActualizarTabla] = useState(false)

    const [listaObjetos, setListaObjetos] = useState([])


    const [selectedFile, setSelectedFile] = useState(null)


    const cargarDatos = async () => {
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
        const userArray = JSON.parse(jsonData)

        fetch('http://localhost:5000/cargaMasivaPublicaciones', {
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

    const handleFileChange = async (event) => {
        setSelectedFile(event.target.files[0])
        const jsonData = await event.target.files[0].text()
        setListaObjetos(JSON.parse(jsonData))
    }



    return (
        <div>
            <NavBarAdmin />
            <div className="home-background">
                <h1 className="fw-bold text-center pt-3 text-white">Carga Masiva de Publicaciones</h1>

                <div className="container pt-3">
                    <div className="container mb-2">
                        <input type="file" className="mb-2 text-white fw-bold " accept=".json" onChange={handleFileChange} />
                        <button type="button" className="btn btn-secondary mx-4" onClick={cargarDatos}>Cargar Archivo</button>
                    </div>
                    <table className="table table-striped pt-5">
                        <thead>
                            <tr>
                                <th scope="col">User</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Visibilidad</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaObjetos.map(post => (
                                    <tr>


                                        <td>{post.codigo}</td>
                                        <td>{post.descripcion}</td>
                                        <td>{post.categoria}</td>
                                        {post.anonimo &&
                                            <td>True</td>
                                        }
                                        {!post.anonimo &&
                                            <td>False</td>
                                        }



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


export default CargaMasivaPublicaciones;