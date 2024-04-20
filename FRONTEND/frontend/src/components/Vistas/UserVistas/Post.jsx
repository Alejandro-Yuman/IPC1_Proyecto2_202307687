import React, { useState } from "react";
import '../../Styles/Styles.css'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from 'sweetalert2'
import NavBar from '../Utils/NavBar'
import Dropdown from 'react-bootstrap/Dropdown';


function Post() {
    const [cookies] = useCookies(['usuario']);
    const [datosUser, setDatosUser] = useState(cookies.usuario)

    const [descripcion, setDescripcion] = useState('');

    const [imagen, setImagen] = useState('');
    const [imagenURL, setImagenURL] = useState('');

    const [categoria, setCategoria] = useState('')
    const [categoriaId, setCategoriaId] = useState('')
    const [anonimo, setAnonimo] = useState(false)

    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };


    const handleImagenChange = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onloadend = () => {
            setImagen(reader.result);
            setImagenURL(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleCategoriaChange = (event) => {
        setCategoriaId(event.target.value)
        setCategoria(event.nativeEvent.target[event.target.value].text)
  
        
    };

    const handleAnonimoChange = (event) => {

        setAnonimo(event.target.checked );


    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(categoriaId);
        if(categoriaId === '0' || categoriaId=== '' ||  categoriaId===undefined){
            Swal.fire({
                icon: "error",
                title: "Seleccione una Categoria",
                showConfirmButton: false,
                timer: 1500
            });
            return
            
        }


        const dataJson = {
            carnet: datosUser.carnet,
            descripcion: descripcion,
            imagen: imagen,
            categoria: categoria,
            anonimo: anonimo
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
                    setImagenURL('');
                } else {
                    Swal.fire({
                        icon: "error",
                        title: res.error,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setImagenURL('');
                }

            })
            .catch((error) => console.error(error))

    };

    return (
        <div>
            <NavBar />
            <div className="home-background ">

                <div className="container pt-5 centrado">
                    <div className="card  w-50">
                        <div className="card-header">

                            Crear una Publicación
                        </div>
                        <div className="card-body">

                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <label className="input-group-text" htmlFor="inputGroupSelect01">Categoria</label>
                                    </div>
                                    <select className="custom-select" id="inputGroupSelect01"onChange={handleCategoriaChange} >
                                        <option value="0">Seleccione una opción</option>
                                        <option value="1">Anuncio Importante</option>
                                        <option value="2">Divertido</option>
                                        <option value="3">Académico</option>
                                        <option value="4">Variedad</option>
                                    </select>
                                </div>
                                <textarea
                                    id="descripcion"
                                    value={descripcion}
                                    onChange={handleDescripcionChange}
                                    rows="4"
                                    required
                                    placeholder="Descripción"
                                    className="widht-100"
                                ></textarea>

                                <div className="form-check form-switch">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-lock" viewBox="0 0 16 16">
                                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
                                    </svg>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleAnonimoChange}/>
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Publicar Anonimo</label>
                                </div>

                                <div className="mt-2">
                                    <label htmlFor="imagen" >Imagen:</label>
                                </div>

                                <div className="mt-3 ">
                                    <input
                                        type="file"
                                        id="imagen"
                                        accept="image/*"
                                        onChange={handleImagenChange}


                                    />
                                </div>

                                <div className="  mt-3">
                                    {imagenURL && <img src={imagenURL} alt="Preview" style={{ maxWidth: '150px' }} />}
                                </div>

                                <button type="submit" className="btn btn-outline-success mt-3">Publicar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;