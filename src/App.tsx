import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './components/AuthLayout/AuthLayout';
import Notfound from './components/Notfound/Notfound';
import Login from './components/Login/Login';
import MasterLayout from './components/MasterLayout/MasterLayout';
import Home from './components/Home/Home';
import UsersList from './components/UsersList/UsersList';
import UsersData from './components/UsersData/UsersData';
import Profile from './components/Profile/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MaterialUl from './components/MterialUl/MaterialUl';

function App() {
  
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'material-ui', element: <MaterialUl /> },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "usersList", element: <UsersList /> },
        { path: "usersData/:userId?", element: <UsersData /> },
        { path: "profile", element: <Profile /> },
      ]
    }
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
