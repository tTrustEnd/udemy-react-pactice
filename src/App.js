import './App.scss';
import Header from './components/Header' ;
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';
import ModalAddNew from './components/ModalAddNew';
import {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';


function App() {
 const [isShowMoidalAddNew, setIsShowModalAddNew] = useState(false)
  const handleClose = () => {
  setIsShowModalAddNew(false)
 }
  return (
    <>
    <div className ='app-container'>
      <Header />
      <Container>
        <div className='my-3 add-new'>
            <span><b>ListUser:</b></span>
            <button className='btn btn-success'
            onClick = { () => setIsShowModalAddNew(true) }
            >Add new user</button>
        </div>
   
      <TableUsers />
      </Container>
      <ModalAddNew 
      show={isShowMoidalAddNew}
      handleClose={handleClose}
      />
    </div>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </>
  );
}
export default App;
