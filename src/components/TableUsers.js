import {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import {fetchAllUser} from '../service/UserService'
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _ from 'lodash'
import ModalConfirm from './ModalConfirm'
import './TableUsers.scss'
import debounce from 'lodash.debounce'
import { CSVLink, CSVDownload } from "react-csv";
import Papa from 'papaparse'
import { toast } from 'react-toastify';

const TableUsers = (props) => {

   const [listUsers, setListUsers] = useState([]);
   const [totalPages, setTotalPages] = useState(0);
   const [totalUsers, setTotalUsers] = useState(0);
   const [dataUserEdit, setDataUserEdit] = useState([])


   const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
   const [isShowModalEditUser, setIsShowModalEditUser] = useState(false)
    
   const [isShowModalConfirm, setIsShowModalConfirm] = useState(false)
   const [dataUserDelete, setDataUserDelete] = useState([])

  const [sortBy, setSortBy] = useState('asc');
  const [sortField, setSortField] = useState('id')
  const [keyWork, setKeyWork] = useState([])
  const [dataExport, setDataExport] = useState([])

  const handleClose = () => {
  setIsShowModalAddNew(false)
  setIsShowModalEditUser(false)
  setIsShowModalConfirm(false)
  }
    const handleUpdateTable = (user) => {
        setListUsers([user,...listUsers])
    }

 useEffect(() => {

    getUsers(1);

    }, [])
 
const getUsers = async (page) => {
let res = await fetchAllUser(page);
if(res && res.data){
    setTotalPages(res.total_pages)
    setListUsers(res.data)
    setTotalUsers(res.total)
}
}
const handlePageClick = (event) => {
    getUsers(+event.selected+1)
}

const handleEditUser = (user) => {
    setDataUserEdit(user)
    setIsShowModalEditUser(true)
}
const handleEditUserFromModal = (user) => {
    console.log(user)
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = cloneListUsers.findIndex((item) => item.id)
    console.log('check index = ', index)
    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers)
}

const handleDeleteUSer = (user) => {
    setIsShowModalConfirm(true)
    setDataUserDelete(user)
}
const handleDeleteUserFromModal = (user) => {
  console.log(user)
  let cloneListUsers = _.cloneDeep(listUsers);
 cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
  setListUsers(cloneListUsers)
}
const handleSort = (sortBy, sortField) => {
  setSortBy(sortBy);
  setSortField(sortField);
  let cloneListUsers = _.cloneDeep(listUsers);
  cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
  setListUsers(cloneListUsers)

}

const handleSearch = debounce((event) => {
  console.log(event.target.value)
  let term = event.target.value;
  if(term){
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
    setListUsers(cloneListUsers)


  }else{
    getUsers(1)
  }
},100)



const getUsersExport = (event, done) => {
  let result =[];
  if(listUsers && listUsers.length>0){
    result.push(["Id","Email","First name","Last name"])
    listUsers.map((item, index) => {
      let arr = [];
      arr[0] = item.id;
      arr[1] = item.email;
      arr[2] = item.first_name;
      arr[3] = item.last_name;
      result.push(arr)
    });
    setDataExport(result);
    done()
  }
}

const handleImportCSV = (event) => {
  if(event.target &&event.target.files && event.target.files[0]){
    let file = event.target.files[0];
    if(file.type !== 'text/csv'){
      toast.error('Only accept csv files')
      return;
    }
    Papa.parse(file, {
      // header:true,
      complete: function(results) {
        let rawCSV = results.data;
        if (rawCSV.length > 1){
        if(rawCSV[0] && rawCSV[0].length===3){
          if(rawCSV[0][0] !== 'email'
          ||rawCSV[0][1] !== 'first_name'
          ||rawCSV[0][2] !== 'last_name'
          ){
            toast.error('Wrong format Header csv file!')
          }else{
            let result  = [];
            rawCSV.map((item, index) => {
              if(index>0 && item.length === 3){
                let obj = {};
                obj.email = item[0];
                obj.first_name = item[1];
                obj.last_name = item[2];
                result.push(obj)
              }
            })
            setListUsers(result)
            console.log(result)
             
          }
        }
          // console.log(rawCSV[0])
          
        }else{
          toast.error('not found csv data')
        }
       
      }
    });
  }

}

    return (<> 

        <div className='my-3 add-new'>
            <span><b>ListUser:</b></span>
            <div className='group-btns'>
              <label htmlFor='test' className='btn btn-warning'>
                <i className="fa-solid fa-file-import"></i>Import 
                </label>
              <input
               id='test' type='file' hidden 
               onChange={(event) => handleImportCSV(event)}
               />
          <CSVLink 
          data={dataExport  } 
          asyncOnClick={true}
          onClick={getUsersExport}
          filename={"my-file.csv"}
          className =' btn btn-primary'>
          <i className="fa-solid fa-file-arrow-down"></i> Export </CSVLink>
          <button className='btn btn-success'
            onClick = { () => setIsShowModalAddNew(true) }
            > 
               <i className="fa-solid fa-circle-plus"></i> Add new
             </button>
          </div>
        </div>
        <div className=' col-4 my-3'>
          <input 
          className='form-control'
          placeholder={'Search user by email'}
          onChange={(event) => handleSearch(event)}
          />
        </div>

    {/* id
email
first_name
last_name */}

    <Table striped bordered hover>
      <thead>
        <tr>
        <th>
          <div className='sort-header'>
          <span>ID</span>
              <span>
            <i 
            className="fa-sharp fa-solid fa-arrow-up"
            onClick = {() => handleSort('esc','id')}
            ></i>
            <i className="fa-sharp fa-solid fa-arrow-down"
              onClick = {() => handleSort('desc','id')}
            ></i>
              </span>
          </div>
          </th>
        
          <th>Email</th>
          
          <th>
          <div className='sort-header'>
          <span>First_name</span>
          <span>
            <i 
            className="fa-sharp fa-solid fa-arrow-up"
            onClick = {() => handleSort('esc','first_name')}
            ></i>
            <i className="fa-sharp fa-solid fa-arrow-down"
              onClick = {() => handleSort('desc','first_name')}
            ></i>
              </span>
          </div>
          </th>
          <th>Last_name</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length > 0 &&

            listUsers.map((item, index)=>{
              return (
                <tr key={`user-${index}`}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>  
                    <button className='btn btn-warning mx-3'
                    onClick = {() => handleEditUser(item)}
                    >Edit</button>
                    <button
                     className='btn btn-danger'
                     onClick = { () => handleDeleteUSer(item) }
                     >Delete</button>

                </td>
        </tr>
              )
        })
        }
      </tbody>
    </Table>
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'

      />
      <ModalAddNew 
      show={isShowModalAddNew}
      handleClose={handleClose}
      handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser 
      show = {isShowModalEditUser}
      handleClose={handleClose}
      dataUserEdit={dataUserEdit}
      handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalConfirm
      show={isShowModalConfirm}
      handleClose={handleClose}
      dataUserDelete={dataUserDelete}
      handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>

  );
}

export default TableUsers;