import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../Vistas/Auth/Login'
import Admin from '../Vistas/Principal/VistaAdministrador'

function Router(){
    
    
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<Navigate to="/login" />} />    
                <Route path="/login"  element={ <Login/>} />
                <Route path="/mainAdmin"  element={ <Admin/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;