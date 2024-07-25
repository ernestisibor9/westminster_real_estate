// import React from "react";
import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";


function Navbar() {
    const [activeMenuItem, setActiveMenuItem] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState();

    // Logout
    const navigate = useNavigate();
    // logout
    const logout = () => {
      localStorage.removeItem("user");
      // window.location.href = "/"; 
      navigate("/login");
    };

      // Get users details
  const getPersonData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(
        "http://localhost:5000/api/user/getloggedinuser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setIsAuthenticated(response.data.user._id);
      } else {
        // toast.error("Invalid authorization");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  useEffect(() => {
    getPersonData();
  });

    const handleMenuItemClick = (menuItem) => {
        setActiveMenuItem(menuItem);
    };
  return (
    <div>
      <nav class="navbar sticky-top navbar-expand-lg ">
        <div class="container-fluid">
          <Link to='/' class="navbar-brand">
            <span className="text-dark fw-bold">Real</span><span className="text-danger fw-bold">Estate</span>
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
              <li>
              <form action="">
              <input
                type="text"
                class="form-control me-2 nav-item"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
              </li>
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
                <Link to='/list-property' class="nav-link">
                  Properties
                </Link>
              </li>
              <li class="nav-item">
                <Link to = '#' class="nav-link">
                  Contact
                </Link>
              </li>
              {
                isAuthenticated ? (
                  <>
                  <li class="nav-item" >
                <button type="button" onClick={logout} class="btn btn-danger">
                  Logout
                </button>
              </li>
              <li class="nav-item">
                <Link to = '/dashboard' class="btn btn-danger">
                  Dashboard
                </Link>
              </li>
                  </>
                ): (
                  <>
                  <li class="nav-item" >
                <Link to = '/login' class="btn btn-danger">
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link to = '/register' class="btn btn-danger">
                  SignUp
                </Link>
              </li>
                  </>
                )
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
