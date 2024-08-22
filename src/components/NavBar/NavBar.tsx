import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
export default function NavBar() {
  let { userData } = useContext(AuthContext)
  return (
   <>
   <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">UMS</a>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">{userData.username}</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
   
   
   </>
  )
}
