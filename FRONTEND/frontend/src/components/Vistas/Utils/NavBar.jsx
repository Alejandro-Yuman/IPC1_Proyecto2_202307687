import React, { useState } from "react";
import '../../Styles/Styles.css'
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function NavBar() {
    const [cookies, setCookies, removeCookie] = useCookies(['usuario'])
    const Navegador = useNavigate();

    const handleSubmit = () => {
        removeCookie('usuario')
        Navegador('/login')

    }

    return (
        <div className="container-navbar">
            <h1>.</h1>
            <img src={require('../../Images/logoApertureSimple.png')} width="30" height="30" alt="" />
            <div className="left-container-navbar">

                <ul className="link-list">

                    <li className="link-list-item">
                        <Link className="link" to="/home">Home</Link>
                    </li>
                    <li className="link-list-item">
                        <Link className="link" to="/createPost">Create Post</Link>
                    </li>
                    <li className="link-list-item">
                        <Link className="link" to="/tendencias">Tendencias</Link>
                    </li>
                </ul>
            </div>
            <div className="right-container-navbar">



                <Dropdown data-bs-theme="dark">
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/editarPerfil">Editar Perfil</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSubmit}>Cerrar Sesión</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </div>

        </div>
    )
}

export default NavBar;