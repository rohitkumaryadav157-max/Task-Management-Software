import React from 'react'
import { Link,Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
function Memlayout() {
  return (


    <>
   
   <div className="container-fluid body">


    
<Navbar 
  menu={[
    { path: "/member", label: "Dashboard" },
    { path: "/member/update", label: "Update Task" },
    { path: "/member/mytask", label: "My Tasks" }
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

export default Memlayout