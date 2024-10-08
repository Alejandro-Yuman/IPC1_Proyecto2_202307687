import React, { useState, useEffect } from "react";
import '../../Styles/Styles.css'
import { useCookies } from "react-cookie";
import { Modal } from "react-bootstrap";
import Swal from 'sweetalert2'
import NavBarAdmin from '../Utils/NavBarAdmin'


function MenuPrincipalAdministrador() {
    const [cookies, setCookies] = useCookies(['usuario'])
    const [datosUser, setDatosUser] = useState(cookies.usuario)

    const [users, setUsers] = useState([])

    const [selectedUser, setSelectedUser] = useState(null)

    const [actualizarTabla, setActualizarTabla] = useState(false)
    useEffect(() => {
        fetch('http://localhost:5000/obtenerUsuarios', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                setUsers(res.usuarios)
            }).catch(((error) => console.error(error)))

    }, [actualizarTabla])

    const userView = (user) => {
        setSelectedUser(user)
    }

    const closeUserView = () => {
        setSelectedUser(null)
    }

    const deleteUser = (carnet) => {
        const myJson = {
            carnet: carnet
        }

        fetch('http://localhost:5000/eliminar', {
            method: "DELETE",
            body: JSON.stringify(myJson),
            headers: {
                "Content-Type": "application/json"
            }
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
                    setActualizarTabla(!actualizarTabla)
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
    const createCSV = () => {
        var array = []
        for (var iterator of users) {
            
            array.push(Object.values(iterator))
        }
        
        var csvContent = array.join("\n");
        var link = window.document.createElement("a");
        link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvContent));
        link.setAttribute("download", "User_Data.csv");
        link.click();
    }


    return (
        <div>
            <NavBarAdmin />
            <div className="home-background">
                <h1 className="fw-bold text-center pt-3 text-white">Usuarios</h1>
                <div className="container ">
                    <button type="button" className="btn btn-secondary mb-2" onClick={createCSV}>Exportar como CSV</button>
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
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr>

                                        <td>{user.carnet}</td>
                                        <td>{user.nombre}</td>
                                        <td>{user.apellidos}</td>
                                        <td>{user.genero}</td>
                                        <td>{user.facultad}</td>
                                        <td>{user.carrera}</td>
                                        <td>{user.correo}</td>
                                        <td>
                                            <button className="btn btn-outline-primary m-1" onClick={() => { userView(user) }}>Ver</button>
                                            <button className="btn btn-outline-danger m-1" onClick={() => { deleteUser(user.carnet) }}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>


                {selectedUser && (
                    <Modal show={true} onHide={closeUserView} backdrop="static" keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Detalles del Usuario</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Carnet: {selectedUser.carnet}</p>
                            <p>Nombre: {selectedUser.nombre}</p>
                            <p>Apellidos: {selectedUser.apellidos}</p>
                            <p>Genero: {selectedUser.genero}</p>
                            <p>facultad: {selectedUser.facultad}</p>
                            <p>Carrera: {selectedUser.carrera}</p>
                            <p>Correo: {selectedUser.correo}</p>

                        </Modal.Body>

                        <Modal.Footer>
                            <button className="btn btn-primary" onClick={closeUserView}>
                                Cerrar
                            </button>
                        </Modal.Footer>
                    </Modal>
                )
                }
            </div>



        </div>
    )
}


export default MenuPrincipalAdministrador;