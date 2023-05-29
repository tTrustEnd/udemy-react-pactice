import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import { postCreateUser } from '../service/UserService'
import { toast } from 'react-toastify';


const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState('')
  const [job, setJob] = useState('')


  const handleSaveUsers = async () => {
    let res = await postCreateUser(name, job);
    if (res && res.id) {
      handleClose();
      setName('');
      setJob('');
      toast.success("A User is create success")
      handleUpdateTable({ first_name: name, id: res.id });
    } else {
      toast.error("An error")
    }
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body add-new'>

            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text"
                  className="form-control"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <div className="form-text"></div>
              </div>
              <div className="mb-3">
                <label className="form-label">Job</label>
                <input type="text"
                  className="form-control"
                  value={job}
                  onChange={(event) => setJob(event.target.value)} />
              </div>
            </form>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUsers()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalAddNew;