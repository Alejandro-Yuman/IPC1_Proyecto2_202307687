import React, { useState } from "react";
import '../../Styles/Styles.css'
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function NavBarAdmin() {
    const [cookies, setCookies, removeCookie] = useCookies(['usuario'])
    const Navegador = useNavigate();

    const handleSubmit = () => {
        removeCookie('usuario')
        Navegador('/login')

    }

    return (
        <div className="container-navbar">
            <div className="left-container-navbar">

                <ul className="link-list">
                    <li className="link-list-item">
                        <Link className="link" to="/mainAdmin">Gestion Usuarios</Link>
                    </li>
                    <li className="link-list-item">
                        <Link className="link" to="/gestionPosts">Gestion Posts</Link>
                    </li>
                    <li className="link-list-item">
                        <Link className="link" to="/cargaMasiva">Carga Masiva</Link>
                    </li>

                    <li className="link-list-item">
                        <Link className="link" to="/reportes">Reportes</Link>
                    </li>
                </ul>
            </div>
            <div className="right-container-navbar">
                <button className="btn btn-outline-info logout-btn" onClick={handleSubmit}>
                    LogOut
                </button>

            </div>

        </div>
    )
}

export default NavBarAdmin;