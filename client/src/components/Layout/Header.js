import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import {NavLink, useNavigate} from "react-router-dom"
import { useAuth } from "../../context/auth";
import "../../Styles/AuthStyle.css"
import toast from "react-hot-toast";
const Header = () =>{
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  
  const handleLogOut = async (e) =>{
    setAuth({
      ...auth,
      user:null,
      token:"",
    })
    localStorage.removeItem("auth")
    toast.success("Logout Successfully")
  }
    return(
       <div>
        <header className="p-3 text-bg-dark">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
       
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
        </ul>

       { !auth.user ? (
        <>
            <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2"
            onClick={()=>navigate('/login')}>Login</button>
            <button type="button" className="btn btn-warning"
            onClick={()=>navigate('/signup')}>Sign-up</button>
          </div>
          </>
       ):(
        <> 

<div className="btn-group mr-3">
  <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    {auth?.user?.name}
  </button>
  <ul class="dropdown-menu">
    <li>
      <NavLink className="dropdown-item" 
      to={`/dashboard/${auth?.user?.role===1 ? "admin": "user"}`}>Dashboard</NavLink></li>
  </ul>
</div>
        
           <div className="text-end ml-2">
           
            <button type="button" className="btn btn-outline-light me-2"
            onClick={handleLogOut}>LOGOUT</button>
          </div>
        </>
       )}
       
      </div>
    </div>
  </header>
  
       </div>
    )
}
export default Header;