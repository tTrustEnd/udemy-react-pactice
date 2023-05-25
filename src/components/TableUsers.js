import {useEffect, useState} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import {fetchAllUser} from '../service/UserService'
const TableUsers = (props) => {

   const [listUsers, setListUsers] = useState([]);

 useEffect(() => {
    getUsers();
    }, [])
 
const getUsers = async () => {
let res = await fetchAllUser();
if(res && res.data && res.data.data){
    setListUsers(res.data.data)
}
}
console.log(listUsers)
    return (<> 
    {/* id
email
first_name
last_name */}

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First_name</th>
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

        </tr>
              )
        })
        }
      </tbody>
    </Table>
    </>

  );
}

export default TableUsers;