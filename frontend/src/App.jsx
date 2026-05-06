import react from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import AssignTask from "./Admin/AssignTask";
import Dash from "./Admin/Dash";
import AddMember from "./Admin/Addmember";
import Adlayout from "./Admin/Adlayout";
import Createproject from "./Admin/Createproject";
import Memlayout from './Member/Memlayout';
import MemDash from './Member/MemDash';
import SeeTask from './Member/SeeTask';
import Update from './Member/Update';
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
  
      {/* Admin Route work  */}
        <Route path='/admin/' element={ <Adlayout/>}>

            <Route path='' element={<Dash/>} />
            <Route path='project' element={<Createproject/>} />
            <Route path='assign' element={<AssignTask/>} />
            <Route path='member' element={<AddMember/>} />
            
        </Route>


        {/* Member Route work  */}

          <Route path='/member/' element={<Memlayout/>}>

            <Route path='' element={<MemDash/>} />
            <Route path='mytask' element={<SeeTask/>} />
            <Route path='update' element={<Update/> } />
           

          </Route>


      </Routes>
    </BrowserRouter>

    </>
  );
}


export default App;