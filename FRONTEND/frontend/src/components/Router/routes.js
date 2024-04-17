import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../Vistas/Auth/Login'
import Admin from '../Vistas/Principal/VistaAdministrador'
import Register from '../Vistas/Auth/Register'
function Router(){
    
    
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<Navigate to="/login" />} />    
                <Route path="/login"  element={ <Login/>} />
                <Route path="/mainAdmin"  element={ <Admin/>} />
                <Route path="/register"  element={ <Register/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;