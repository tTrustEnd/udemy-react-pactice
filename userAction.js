
import { toast } from 'react-toastify'
import { apiLogin } from '../../service/UserService';

export const USER_LOGIN = "USER_LOGIN";

export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN"
export const FETCH_USER_ERROR = "FETCH_USER_ERROR"
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS"

export const USER_LOGOUT = "USER_LOGOUT";

export const USER_REFRESH = "USER_REFRESH";





const handleLoginUserRedux = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({type:FETCH_USER_LOGIN});
        let res = await apiLogin(email, password);
        localStorage.setItem('token',res.token);
        localStorage.setItem('email',email.trim());

        // console.log(res)
        if (res && res.token) {
            dispatch({type:FETCH_USER_SUCCESS,
                        data:{email: email.trim(), token:res.token}
                    })
  
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
            dispatch({type:FETCH_USER_ERROR,
            })

        }
    }

  
}
export default handleLoginUserRedux;
export const handleLogoutUSerRedux = ()=>{
    return (dispatch, token) =>{
        dispatch({
            type:USER_LOGOUT
        })
    }
}
export const handleRefresh = () => {
    return (dispatch, token) =>{
        dispatch({
            type:USER_REFRESH
        })
    }
}