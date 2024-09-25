import axios from 'axios'
import  { useEffect,  useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../context/AuthContext'

export default function Profile() {
  const { register, handleSubmit, setValue} = useForm()
  const { userData } :any= useContext(AuthContext)

  useEffect(() => {
    if (userData) {
      axios.get(`https://dummyjson.com/users/${userData.id}`)
        .then(response => {
          const user = response.data;
          setValue('firstName', user.firstName);
          setValue('lastName', user.lastName);
          setValue('email', user.email);
          setValue('age', user.age);
          setValue('phone', user.phone);
          setValue('birthDate', user.birthDate);
        })
        .catch(error => console.error(error));
    }
  }, [userData, setValue])

  const onSubmit = async (data :any) => {
    try {
      await axios.put(`https://dummyjson.com/users/${userData.id}`, data)
     
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="title p-3">
        <h3>Profile</h3>
      </div>
      <div className='text-center'>
        <img src={userData?.image} className='rounded-circle my-3' alt="profile" />
        <h6>{userData?.firstName} {userData?.lastName}</h6>
      </div>
      <form className='shadow-sm m-4 p-4' onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" placeholder="Enter your First Name" {...register("firstName")} />
            </div>
      
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" placeholder="Enter your Last Name" {...register("lastName")} />
            </div>
        
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="text" className="form-control" placeholder="Enter your Email" {...register("email")} />
            </div>
           
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input type="number" className="form-control" placeholder="Enter your Age" {...register("age")} />
            </div>
          
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control" placeholder="Enter your Phone" {...register("phone")} />
            </div>
         
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Birth Date</label>
              <input type="text" className="form-control" {...register("birthDate")} />
             
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

