import React from 'react';
import './navbar.css';
import { FaBars, FaRegBell } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import logo from "../assets/cartoon.jpg";
import ethara from '../assets/etharalogo.jpeg'

const Navbar = (p) => {
    return (
        <>
        <div className='container-fluid p-3'>

            <nav className="top-navbar d-flex justify-content-between align-items-center">

                {/* Left Side: Toggle Bars */}
                <div className="nav-left">
                    <div 
                        className="toggle-btn"
                        data-bs-toggle="offcanvas" 
                        data-bs-target="#sidebar"
                    >
                        <FaBars size={22}/>
                    </div>
                </div>

                {/* Right Side */}
                <div className="nav-right d-flex align-items-center gap-3">

                    {/* Notification */}
                    <div className="notification-icon position-relative">
                        <FaRegBell size={20}/>
                        <span className="notification-dot"></span>
                    </div>

                    {/* Profile */}
                    <div className="user-profile-wrapper">
                        <img 
                            src={logo} 
                            alt="User" 
                            className="user-avatar" 
                        />
                    </div>
                </div>
            </nav>

        </div>

        {/* OFFCANVAS SIDEBAR */}
        <div 
            className="offcanvas offcanvas-start" 
            tabIndex="-1" 
            id="sidebar"
        >
            <div className="offcanvas-header">
                
                <button 
                    type="button" 
                    className="btn-close" 
                    data-bs-dismiss="offcanvas"
                ></button>
            </div>

            <div className="offcanvas-body">
           <img 
                            src={ethara} 
                            alt="User" 
                            className="user-avatar rounded-primary" 
                        />
       <ul className="list-unstyled">

  
  {p.menu && p.menu.map((item, i) => (
    <li className="mb-3" key={i}>
      <NavLink to={item.path}>{item.label}</NavLink>
    </li>
  ))}

  

  <li className="mt-4">
    <Link to="/" className="text-danger">
      Logout
    </Link>
  </li>

</ul>

            </div>
        </div>

        </>
    );
};

export default Navbar;