import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
// import { UserContext } from '../context/UserContext';
import handleLoginUserRedux from "../redux/actions/userAction";
import {useDispatch, useSelector} from 'react-redux'

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingAPI, setLoadingAPI] = useState(false)
    const navigate = useNavigate();
    const isLoading = useSelector(state => state.user.isLoading)
   const account = useSelector(state=>state.user.account)

    const handleLogin = async () => {
        setLoadingAPI(true)
        if (!email || !password) {
            toast.error("email/password is required!")
            return;
        }
        // let res = await apiLogin(email, password);
        // // console.log(res)
        // if (res && res.token) {
        //     loginContext(email, res.token)
        //     navigate('/')
            
        // } else {
        //     if (res && res.status === 400) {
        //         toast.error(res.data.error);
        //     }
        // }
        dispatch(handleLoginUserRedux(email, password))
        
        setLoadingAPI(false)
    }

        const handleGoBack = () => {
            navigate('/')
        }

        const handlePressEnter = (event) => {
            if(event.key === 'Enter'){
                handleLogin()
            }
        }
        useEffect(()=>{
            if(account && account.auth===true){
                navigate('/')
            }
        },[account])

    return (<>
        <div className="login-container col-12 col-sm-4">
            <div className='title'> Log in</div>
            <div className="text"> Email or username ( eve.holt@reqres.in ) </div>
            <input
                value={email}
                onChange={(event) => setEmail(event.target.value.trim())}
                type='text' placeholder='Email or username...' />
            <div className="input-2">
                <input
                    value={password}
                    onChange={(event) => setPassWord(event.target.value.trim())}
                    type={isShowPassword === true ? 'text' : 'password'}
                    placeholder='Passwork...' 
                    onKeyDown={(event) => handlePressEnter(event)}
                    />
                <i
                    className={isShowPassword === true ? "fa-sharp fa-solid fa-eye" : "fa-sharp fa-solid fa-eye-slash"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>
            <button
                disabled={email && password ? false : true}
                className={email && password ? "active" : ""}
                onClick={() => handleLogin()}
            >
                {isLoading && <i className="fas fa-spinner fa-spin"></i>} Login
            </button>
            <div className='back'>
                 <i className="fa-solid fa-angles-left"></i>
                  <span onClick = {() => handleGoBack() }> Go back</span>
                  </div>
        </div>
    </>)
}
export default Login;