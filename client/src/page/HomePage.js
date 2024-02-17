import axios from "axios";
import Layout from"../components/Layout/Layout"
import React, { useEffect, useState } from "react";
const HomePage = () =>{
    const [cource,setCources] = useState([]);

    const getAllCource = async()=>{
        try {
            const {data} = await axios.get('/api/v1/cource/get-cource')
            setCources(data?.cource)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getAllCource();
    },[])
 return(
    <Layout>
        <div></div>
        <h5 className="mt-20 ml-20 font-serif">Cource Overview</h5>
        <div className="flex mx-5 flex-wrap">
            {
              cource?.map((c)=>(
                <>
                 <div className="card m-5" style={{width: '18rem'}}>
  <img src="https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&w=750&dpr=2" className="card-img-top" alt="Cource" />
  <div className="card-body">
    <p className="card-text">{c.name}</p>
  </div>
</div>
                </>
              ) )
            }
       

</div>
       
    </Layout>
 )
}
export default HomePage;