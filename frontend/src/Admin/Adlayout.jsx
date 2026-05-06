import React from 'react'
import { Link,Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
function Adlayout() {
  return (


    <>
   
   <div className="container-fluid body">


    
<Navbar 
  menu={[
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/project", label: "Add Project" },
    { path: "/admin/assign", label: "Assign Task" },
    { path: "/admin/member", label: "Add Member" }
  ]}
/>



    {/* <br/>

    <br/> */}

    <div className='mt-5'>

    <Outlet/>

    </div>

    </div>
    </>
  )
}

export default Adlayout