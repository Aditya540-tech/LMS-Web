import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import CourceForm from '../../components/Layout/Form/CourceForm'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Modal} from "antd"

const AdminDashboard = () => {
  const [cources,setCources] = useState([])
  const [name,setName] = useState("");
  const [updateName,setUpdateName] = useState("");
  const [visible,setVisible] = useState(false);
  const [selected,setSelected] = useState(null)

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const {data} = await axios.post("/api/v1/cource/create-cource",{
        name
      })
      if(data?.success){
        getAllCource();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Somthing went wrong in input form")
    }
  }

  const getAllCource = async() =>{
    try {
      const {data} = await axios.get("/api/v1/cource/get-cource")
      if(data?.success){
        setCources(data?.cource)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  useEffect(()=>{
     getAllCource();
  },[])

  const handleUpdate = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.put(`/api/v1/cource/update-cource/${selected._id}`,
      {name:updateName});
      console.log(data)
      if(data.success){
        toast.success(`${updateName} is updated`)
        setSelected(null)
        setUpdateName("");
        setVisible(false)
        getAllCource();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async(pId)=>{
    try {
      const {data} = await axios.delete(`/api/v1/cource/delete-cource/${pId}`)

      if(data.success){
        toast.success('Cource is deleted')
         getAllCource();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went Wrong')
    }
  }
  return (
    <Layout>
      <h1 className='text-center scroll-mb-5' >Admin Dashboard</h1>
      <div className='grid grid-cols-3 gap-4 mt-6'>
        <div className=''>
          
        </div>
        <div className='col-span-2'>
          <h3 className='ml-4'>Add Cource</h3>
          <div>
            <CourceForm 
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}/>
          </div>
          <div>
          <table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    { cources?.map((c)=>(
      <>
      <tr>
        <td key={c._id}>{c.name}</td>
        <td>
          <button className="btn btn-primary ms-2"
          onClick={()=>{
              setVisible(true);
              setUpdateName(c.name);
              setSelected(c)
          }}>Edit</button>
        </td>
        <td>
        <button className="btn btn-danger ms-2"
        onClick={()=>{
          handleDelete(c._id)
        }}>Delete</button>
        </td>
      </tr>
      </>
   )) }
   
  </tbody>
</table>
          </div>
<Modal
onCancel={()=>
setVisible(false)}
footer={null}
visible={visible}
>
<CourceForm value={updateName}
setValue={setUpdateName} 
handleSubmit={handleUpdate}/>
</Modal>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
