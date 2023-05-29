import { Modal, Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { deleteUser } from '../service/UserService'

const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props;
  const confirmDelete = async () => {
    let res = await deleteUser(dataUserDelete)
    if (res && +res.statusCode === 204) {
      toast.success('Delete user successfully')
      handleClose();
      handleDeleteUserFromModal(dataUserDelete)
    } else {
      toast.error('Delete user failed')
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
          <Modal.Title>Delete a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body add-new'>
            <span>
              This action can't be undone!

              Do want to delete this user<br /> <b>email ={dataUserDelete.email}?</b>
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalConfirm;