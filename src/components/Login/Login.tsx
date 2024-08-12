import axios from 'axios';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {  AuthContext } from '../../context/AuthContext';
export default function Login() {
  let { seveUserData } = useContext(AuthContext)
  let navigate = useNavigate();
  let { register, handleSubmit, formState: { errors } } = useForm();
  let onSubmit = async (data) => {
    try {
      let response = await axios.post('https://dummyjson.com/auth/login', data);
      localStorage.setItem("userToken", response.data.token);
      seveUserData()
      toast.success("login success");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

    }

  }
  return (
    <>

      <div className="container-fluid  login-container">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-4 bg-white rounded rounded-3 px-4 py-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="title text-center">
                <h4>User Management System</h4>
                <h5 className='py-3'>sign in </h5>
                <span className='text-muted'>Enter your credentials to access your account</span>
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter your email"  {...register("username", { required: "Username is required" })} />
              </div>
              {errors?.username && <span className='text-danger'>{errors?.username?.message}</span>}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter your password"  {...register("password", { required: "password is requored" })} />
              </div>
              {errors?.password && <span className='text-danger'>{errors?.password?.message}</span>}
              <button type='submit' className='btn btn-warning text-white w-100'>SIGN IN</button>
            </form>
          </div>
        </div>
      </div>


    </>
  )
}
