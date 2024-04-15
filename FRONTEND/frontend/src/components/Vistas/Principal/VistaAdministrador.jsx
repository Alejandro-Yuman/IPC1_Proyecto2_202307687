import React, { useState, useEffect } from "react";
import '../../Styles/Styles.css'
import { useCookies } from "react-cookie";
import { Modal } from "react-bootstrap";


function MenuPrincipalAdministrador() {
    const [cookies, setCookies] = useCookies(['usuario'])
    const [datosUser, setDatosUser] = useState(cookies.usuario)

    const [users, setUsers] = useState([])

    const [selectedUser, setSelectedUser] = useState(null)
 
    const [actualizarTabla,setActualizarTabla] = useState(false)
    useEffect(() => {
        fetch('http://localhost:5000/obtenerUsuarios', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((res) => {
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
                if(res.mensaje){
                    alert(res.mensaje)
                    setActualizarTabla(!actualizarTabla)
                }else{
                    alert(res.error)
                }
                
            }).catch(((error) => console.error(error)))
    }


    return (
        <div className="login-background">
            <h1>Nombre {datosUser.nombre}</h1>
            <div className="container pt-5">
                <table class="table table-striped pt-5">
                    <thead>
                        <tr>
                            <th scope="col">Carnet</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Genero</th>
                            <th scope="col">Facultad</th>
                            <th scope="col">Carrera</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Contraseña</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{user.carnet}</td>
                                    <td>{user.nombre}</td>
                                    <td>{user.apellidos}</td>
                                    <td>{user.genero}</td>
                                    <td>{user.facultad}</td>
                                    <td>{user.carrera}</td>
                                    <td>{user.correo}</td>
                                    <td>
                                        <button class="btn btn-outline-primary m-1" onClick={() => { userView(user) }}>Ver</button>
                                        <button class="btn btn-outline-danger m-1" onClick={() => { deleteUser(user.carnet) }}>Eliminar</button>
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




    )
}


export default MenuPrincipalAdministrador;