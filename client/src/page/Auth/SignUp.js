import { useState } from "react"
import Layout from "../../components/Layout/Layout"
import "../../Styles/AuthStyle.css"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
const SignUp = () =>{
    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [phone,setPhone]= useState("");
    const [address,setAddress]= useState("");
    const [answer,setAnswer]= useState("");
    const navigate = useNavigate()

    const handleSubmit =async(e)=>{
       e.preventDefault();
      try {
        const res = await axios.post('/api/v1/auth/signup',
        {name,email,password,phone,address,answer});

        if(res.data && res.data.success){
            toast.success(res.data && res.data.message);
            navigate("/login")
        }else{
            toast.error(res.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }
    return(
        <Layout>
           
            <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h4 className="title">SignUp</h4>
        <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              aria-describedby="emailHelp"
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
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              placeholder="Enter Your Phone Number"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={answer}
              onChange={(e)=>setAnswer(e.target.value)}
              placeholder="Enter Your Answer"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
        </Layout>
    )
}
export default SignUp