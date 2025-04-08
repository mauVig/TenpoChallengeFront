import { Home } from "../private/page/Home";
import Login from "../public/page/Login"
import { Routes, Route } from 'react-router-dom';

// Utilicé la librería de router de react para poder tener estas 2 páginas y poder navegar entre ellas.

export const AppRouter = () => {    
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />} />
            </Routes>
            
        </>
    )
}
export default AppRouter