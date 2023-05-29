import { Routes, Route, Link } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const PrivateRoute = (props) => {

    const {user} = useContext(UserContext);
    if(!user||!user.email){
    return (
        <>
        you don't have permission access route
        </>
    )
}

    return (
        <>
    {props.children}
    
  </>
    )
}
export default PrivateRoute;