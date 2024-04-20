import React, { useState } from "react";
import '../../Styles/Styles.css'
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

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
            <img  src={require('../../Images/logoApertureSimple.png')} width="30" height="30" alt="" />
            <div className="left-container-navbar">

                <ul className="link-list">

                    <li className="link-list-item">
                        <Link className="link" to="/home">Home</Link>
                    </li>
                    <li className="link-list-item">
                        <Link className="link" to="/createPost">Create Post</Link>
                    </li>
                </ul>
            </div>
            <div className="right-container-navbar">
                <li className="text-center">
                    <Link className="link" to="/editarPerfil">Editar Perfil</Link>
                </li>
                <button className="btn btn-outline-info logout-btn" onClick={handleSubmit}>
                    LogOut
                </button>


            </div>

        </div>
    )
}

export default NavBar;