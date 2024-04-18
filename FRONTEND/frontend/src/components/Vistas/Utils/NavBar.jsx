import React, { useState } from "react";
import '../../Styles/Styles.css'
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function NavBar(){
    const [cookies,setCookies,removeCookie] = useCookies(['usuario'])
    const Navegador = useNavigate();

    const handleSubmit = () => {
        removeCookie('usuario')
        Navegador('/login')

    }

    return(
        <div className="container-navbar">
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
                <button className="btn btn-outline-info logout-btn" onClick={handleSubmit}>
                    LogOut
                </button>

            </div>

        </div>
    )
}

export default NavBar;