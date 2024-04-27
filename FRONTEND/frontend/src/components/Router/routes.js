import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../Vistas/Auth/Login'
import Admin from '../Vistas/Principal/VistaAdministrador'
import Register from '../Vistas/Auth/Register'
import Home from '../Vistas/Principal/Home'
import Post from '../Vistas/UserVistas/Post'
import PrimeraPagina from '../Vistas/Principal/PrimeraPagina'
import EditarPerfil from '../Vistas/UserVistas/EditarPerfil'
import AllPost from '../Vistas/AdminVistas/AllPost'
import CargaMasivaUsuarios from '../Vistas/AdminVistas/CargaMasivaUsuarios'
import CargaMasivaPublicaciones from '../Vistas/AdminVistas/CargaMasivaPublicaciones'
import Reportes from '../Vistas/AdminVistas/Reportes'
import PostTendencia from "../Vistas/UserVistas/Tendencias";
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
                <Route path="/gestionPosts"  element={ <AllPost/>} />
                <Route path="/cargaMasivaUsuarios"  element={ <CargaMasivaUsuarios/>} />
                <Route path="/cargaMasivaPublicaciones"  element={ <CargaMasivaPublicaciones/>} />
                <Route path="/reportes"  element={ <Reportes/>} />
                <Route path="/tendencias"  element={ <PostTendencia/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;