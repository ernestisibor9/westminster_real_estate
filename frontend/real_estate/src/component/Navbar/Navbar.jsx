// import React from "react";
import "./Navbar.css"
import { assets } from "../../assets/asset";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

function Navbar() {
    const [activeMenuItem, setActiveMenuItem] = useState('');

    const handleMenuItemClick = (menuItem) => {
        setActiveMenuItem(menuItem);
    };
  return (
    <div>
      <nav class="navbar sticky-top navbar-expand-lg ">
        <div class="container-fluid">
          <Link to='/' class="navbar-brand">
            <img src={assets.logo} alt="" />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FaBars className="fabars"/>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className={`nav-item ${activeMenuItem === 'home' ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick('home')}>
                <Link to='/' class="nav-link" aria-current="page">
                  Home
                </Link>
              </li>
              <li className={`nav-item ${activeMenuItem === 'about' ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick('about')}>
                <Link to='/about' class="nav-link">
                  About
                </Link>
              </li>
              <li class="nav-item">
                <Link to='#' class="nav-link">
                  Services
                </Link>
              </li>
              <li class="nav-item">
                <Link to = '#' class="nav-link">
                  Contact
                </Link>
              </li>
              <li class="nav-item" >
                <Link to = '#' class="btn btn-danger">
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link to = '#' class="btn btn-danger">
                  SignUp
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
