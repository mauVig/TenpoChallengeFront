import { Home } from "../private/page/Home";
import Login from "../public/page/Login"
import { Routes, Route } from 'react-router-dom';


export const AppRouter = () => {    
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />} />
                
            </Routes>
            {/* <Home /> */}
            <Login />
        </>
    )
}
export default AppRouter