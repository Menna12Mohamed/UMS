import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function UsersData() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { userId } = useParams()
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    if (userId) {

      setIsUpdate(true)

      axios.get(`https://dummyjson.com/users/${userId}`)
        .then(response => {
          const userData = response.data

          setValue('firstName', userData.firstName)
          setValue('lastName', userData.lastName)
          setValue('email', userData.email)
          setValue('age', userData.age)
          setValue('phone', userData.phone)
          setValue('birthDate', userData.birthDate)
        })
        .catch(error => console.log(error))
    }
  }, [userId, setValue])

  const onSubmit = async (data:any) => {
    try {
      if (isUpdate) {
        await axios.put(`https://dummyjson.com/users/${userId}`, data)
        toast.success('Update success')
      } else {
        await axios.post('https://dummyjson.com/users/add', data)
        toast.success('Add success')
      }
      navigate("/dashboard/usersList")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="title p-3">
        <h3>{isUpdate ? 'Update User' : 'Add User'}</h3>
      </div>
      <form className='shadow-sm m-4 p-4' onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter your First Name" aria-label='FirstName'{...register("firstName", { required: "First name is required" })} />
            </div>
            {errors.firstName && <span className='text-danger'>{errors.firstName.message}</span>}
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter your Last Name" aria-label='LastName'{...register("lastName", { required: "last name is required" })} />
            </div>
            {errors.lastName && <span className='text-danger'>{errors.lastName.message}</span>}
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter your Email" aria-label='Email' {...register("email", { required: "email is required", pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email should be vaild' } })} />
            </div>
            {errors.email && <span className='text-danger'>{errors.email.message}</span>}
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input type="number" className="form-control" id="formGroupExampleInput" placeholder="Enter your Age" aria-label='Age' {...register("age", { required: "age is required", max: { value: 50, message: 'max age is 50' } })} />
            </div>
            {errors.age && <span className='text-danger'>{errors.age.message}</span>}
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter your Phone" aria-label='Phone' {...register("phone", { required: "phone is required" })} />
            </div>
            {errors.phone && <span className='text-danger'>{errors.phone.message}</span>}
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">BirthDate</label>
              <input type={isUpdate ? "text" : "date"} className="form-control" id="formGroupExampleInput" placeholder="Enter your BirthDate" aria-label='BirthDate' {...register("birthDate", { required: "birth date is required" })} />
              {errors.birthDate && <span className='text-danger'>{errors.birthDate.message}</span>}
            </div>
          </div>
        </div>
        <div className='text-center'>
          <button type='submit' className='btn btn-warning text-center text-white w-25 mt-2'>SAVE</button>
        </div>
      </form>
    </>
  )
}
