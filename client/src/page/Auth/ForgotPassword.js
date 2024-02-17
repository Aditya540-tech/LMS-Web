import React, { useState } from 'react'
import Layout from "../../components/Layout/Layout"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const ForgotPassword = () => {
    const [email,setEmail] = useState("");
    const [answer,setAnswer] = useState("");
    const [newPassword,setNewPassword]= useState("");
   
    const navigate = useNavigate();

   const handleSubmit = async(e)=>{
     e.preventDefault();
     try {
        const res = await axios.post('/api/v1/auth/forgot-password',
        {email,newPassword,answer})
        
        if(res.data && res.data.message){
            navigate('/login')
        }else{
            toast.error(res.data.message)
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
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              placeholder="Enter Your New Password"
              required
            />
          </div>    
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              value={answer}
              onChange={(e)=>setAnswer(e.target.value)}
              placeholder="Enter Your Secret Key"
              required
            />
          </div>      
          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword
