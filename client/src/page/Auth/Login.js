import Layout from "../../components/Layout/Layout";
import React, { useState } from "react";
import "../../Styles/AuthStyle.css"
import toast from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [auth,setAuth] = useAuth()
   const navigate = useNavigate()
   const location = useLocation();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/login',{email,password})
       
      if(res.data && res.data.message){
        toast.success(res.data && res.data.message)
       setAuth({
        ...auth,
        user:res.data.user,
        token: res.data.token,
       })
       localStorage.setItem("auth",JSON.stringify(res.data))
        navigate(location.state || '/')
      }else{
        console.log(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
     
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h1 className="title">Login</h1>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
          <button type="submit" className="btn btn-primary"
          onClick={()=>navigate('/forgot-password')}>
            FORGOT PASSWORD
          </button> 
          </div>       
          <button type="submit" className="btn btn-primary">
            LOGIN 
          </button>
          
        </form>
      </div>
    </Layout>
  );
};
export default Login;
