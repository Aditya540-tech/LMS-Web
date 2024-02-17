import Header from "./Header"
import React from "react"

const Layout  = ({children}) =>{
   return(
    <div>
    <Header/>
    <main>{children}</main>
    
    </div>
   )
}
export default Layout