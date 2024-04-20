import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../Vistas/Auth/Login'
import Admin from '../Vistas/Principal/VistaAdministrador'
import Register from '../Vistas/Auth/Register'
import Home from '../Vistas/Principal/Home'
import Post from '../Vistas/UserVistas/Post'
import PrimeraPagina from '../Vistas/Principal/PrimeraPagina'
import EditarPerfil from '../Vistas/UserVistas/EditarPerfil'

function Router(){
    
    
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<Navigate to="/primeraPagina" />} />    
                <Route path="/login"  element={ <Login/>} />
                <Route path="/mainAdmin"  element={ <Admin/>} />
                <Route path="/register"  element={ <Register/>} />
                <Route path="/home"  element={ <Home/>} />
                <Route path="/createPost"  element={ <Post/>} />
                <Route path="/primeraPagina"  element={ <PrimeraPagina/>} />
                <Route path="/editarPerfil"  element={ <EditarPerfil/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;