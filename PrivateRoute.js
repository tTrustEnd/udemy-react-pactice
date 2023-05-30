import { Routes, Route, Link } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import {useSelector} from 'react-redux'
const PrivateRoute = (props) => {

    const user = useSelector(state => state.user.account)
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