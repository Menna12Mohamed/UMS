import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  image: string;
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const [userData, setUserData] = useState<User | null>(null)

  const handleClose = () => setShow(false)
  const handleShow = (user: User) => {
    setShow(true)
    setUserData(user)
    setUserId(user.id)
  }

  const getUsers = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users')
      setUsers(response.data.users)
    } catch (error) {
      console.log(error)
    }
  }

  const navigateToUserData = () => {
    navigate("/dashboard/usersData")
  }

  const editUser = (userId: number) => {
    navigate(`/dashboard/usersData/${userId}`)
  }

  const deleteUser = async () => {
    try {
      if (userId !== null) {
        await axios.delete(`https://dummyjson.com/users/${userId}`)
        toast.success('Delete successful')
        handleClose()
        getUsers()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Are you sure you want to delete {userData?.firstName} {userData?.lastName}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteUser}>
            Yes
          </Button>
          <Button variant="warning" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='title d-flex p-3 justify-content-between'>
        <h3>Users List</h3>
        <button className='btn btn-warning' onClick={navigateToUserData}>Add New User</button>
      </div>
      <hr />
      <div className='p-3'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">BirthDate</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row"><img className='w-25' src={user.image}  /></th>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.birthDate}</td>
                <td>
                  <i className='fa fa-edit text-warning mx-1' aria-hidden="true" onClick={() => editUser(user.id)}></i>
                  <i onClick={() => handleShow(user)} className='fa fa-trash text-warning  mx-1' aria-hidden="true"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
