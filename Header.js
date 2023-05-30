import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png'
import {  NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useContext,useEffect,useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutUSerRedux } from '../redux/actions/userAction';

const Header = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.account)

  const { logout } = useContext(UserContext)
  const navigate = useNavigate();
  const [accessMn, setAccessMn] = useState(false)

  const handleLogout = () => {
    // localStorage.removeItem("token");
    // logout();
    dispatch(handleLogoutUSerRedux());
   
  }
  // let location = useLocation();

  const goBackHome = () => {
    navigate('/')
  }

  const handleManageUsers = () =>{
    if(user && user.email){
      navigate('/')
    }else{
      navigate('/user')
    }
  }

  useEffect(()=>{
    if(user && user.auth === false && window.location.pathname !== '/login'){
      navigate("/");
      toast.success("Log out success!")
    }
  
  },[user])

  return (<>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logoApp}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          >
          </img>
          <span onClick = {goBackHome}> Demo App</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          { (user && user.auth || window.location.pathname==='/')&&
          <>
            < Nav className="me-auto" >
          <NavLink to="/" className={isActive =>
            "nav-link" + (!isActive ? " unselected" : "")
          }
          >   Home
          </NavLink>
          
          <NavLink to="/users" className={isActive =>
            "nav-link" + (!isActive ? " unselected" : "")
          }
          >
         Manage Users
          </NavLink>

        </Nav>
        <Nav>
          {user && user.email && <span className='nav-link'> Welcome {user.email}</span>}
          <NavDropdown title="Setting" >
            {user && user.auth === true ?
              <NavDropdown.Item onClick={handleLogout}>Logout </NavDropdown.Item>
              : <NavLink to='/login' className='dropdown-item'>Login</NavLink>
            }
          </NavDropdown>
        </Nav>
        </>
          }   
       
      </Navbar.Collapse>
    </Container>
  </Navbar >
  </>
  );
}

export default Header;

