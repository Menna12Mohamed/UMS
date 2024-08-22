import axios from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

type FormData = {
  username: string;
  password: string;
};

export default function Login() {
  let authContext = useContext(AuthContext);

  if (!authContext) {
    return null; // أو قم بإظهار رسالة خطأ إذا كان السياق غير معرف
  }

  let { saveUserData } = authContext;
  let navigate = useNavigate();
  let { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  let onSubmit = async (data: FormData) => {
    try {
      let response = await axios.post('https://dummyjson.com/auth/login', data);
      localStorage.setItem("userToken", response.data.token);
      saveUserData();
      toast.success("Login success");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  return (
    <>
      <div className="container-fluid login-container">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-4 bg-white rounded rounded-3 px-4 py-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="title text-center">
                <h4>User Management System</h4>
                <h5 className='py-3'>Sign In</h5>
                <span className='text-muted'>Enter your credentials to access your account</span>
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter your email" {...register("username", { required: "Username is required" })} />
                {errors.username && <span className='text-danger'>{errors.username.message}</span>}
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Enter your password" {...register("password", { required: "Password is required" })} />
                {errors.password && <span className='text-danger'>{errors.password.message}</span>}
              </div>
              <button type='submit' className='btn btn-warning text-white w-100'>SIGN IN</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
