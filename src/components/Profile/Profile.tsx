import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'

export default function Profile() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const { userData } = useContext(AuthContext)

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

  const onSubmit = async (data) => {
    try {
      await axios.put(`https://dummyjson.com/users/${userData.id}`, data)
      toast.success('Profile updated successfully')
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
              <input type="text" className="form-control" placeholder="Enter your First Name" {...register("firstName", { required: "First name is required" })} />
            </div>
            {errors.firstName && <span className='text-danger'>{errors.firstName.message}</span>}
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" placeholder="Enter your Last Name" {...register("lastName", { required: "Last name is required" })} />
            </div>
            {errors.lastName && <span className='text-danger'>{errors.lastName.message}</span>}
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="text" className="form-control" placeholder="Enter your Email" {...register("email", { required: "Email is required", pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email should be valid' } })} />
            </div>
            {errors.email && <span className='text-danger'>{errors.email.message}</span>}
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input type="number" className="form-control" placeholder="Enter your Age" {...register("age", { required: "Age is required", max: { value: 50, message: 'Max age is 50' } })} />
            </div>
            {errors.age && <span className='text-danger'>{errors.age.message}</span>}
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control" placeholder="Enter your Phone" {...register("phone", { required: "Phone is required" })} />
            </div>
            {errors.phone && <span className='text-danger'>{errors.phone.message}</span>}
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Birth Date</label>
              <input type="text" className="form-control" {...register("birthDate", { required: "Birth date is required" })} />
              {errors.birthDate && <span className='text-danger'>{errors.birthDate.message}</span>}
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

