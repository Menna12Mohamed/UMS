import React, { useContext, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import profileImg from '../../assets/images/profile.jpg'
import { AuthContext } from '../../context/AuthContext';

export default function SideBar() {
  let { userData } = useContext(AuthContext)
  const [isCollapsed, setIsCollapsed] = useState(false);
  let toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }
  return (
    <>

      <div className='sidebarContainer  vh-100'>
        <Sidebar collapsed={isCollapsed}>
          <Menu>
            {isCollapsed ?
              <i onClick={toggleCollapse} className='fa fa-arrow-right px-5' aria-hidden="true"></i> :
              <i onClick={toggleCollapse} className='fa fa-arrow-left px-5' aria-hidden="true"></i>}
            <div className='text-center my-5'>
              <img src={userData?.image } className='rounded-circle my-3' alt="profile" />
              <h6>{userData?.firstName} {userData?.lastName}</h6>
            </div>
            <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="/dashboard" />}> Home</MenuItem>
            <MenuItem icon={<i className='fa fa-list'></i>} component={<Link to="/dashboard/usersList" />}> Users</MenuItem>
            <MenuItem icon={<i className='fa fa-users'></i>} component={<Link to="/dashboard/usersData" />}> User Data</MenuItem>
            <MenuItem icon={<i className="fa fa-user"></i>} component={<Link to="/dashboard/profile" />}> Profile</MenuItem>
          </Menu>
        </Sidebar>;
      </div>


    </>
  )
}
