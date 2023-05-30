import { Routes, Route, Link } from 'react-router-dom'
import Home from '../components/Home';
import Login from '../components/Login';
import PrivateRoute from './PrivateRoute';
import { Children } from 'react';
import TableUsers from '../components/TableUsers'
import NotFound from './NotFound'

const AppRoutes = () => {
    return (
        <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
           
            <Route
        path="/users"
        element={
            <PrivateRoute >
            <TableUsers />
             </PrivateRoute>

                }
            />
             <Route path ='*' element  = {<NotFound/>} />
        </Routes>
       
       
        </>
    )
}
export default AppRoutes;