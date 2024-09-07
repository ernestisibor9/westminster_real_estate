import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

import "./Dashboard.css";
import { assets } from "../../assets/asset";

function Dashboard() {
  const [userInfo, setUserInfo] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [count, setCount] = useState(null);
  const [countUser, setCountUser] = useState(null);
  const [countActive, setCountActive] = useState(null);
  const [countPending, setCountPending] = useState(null);

  // Get user's details from the token generated
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
        setUserInfo(response.data.user);
        setIsAuthenticated(response.data.user.role);
        // console.log(userInfo);
      } else {
        toast.error("Invalid authorization");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  useEffect(() => {
    getPersonData();
  });

  const navigate = useNavigate();
  // logout
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Total number of properties
  useEffect(() => {
    const fetchDocumentCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/property/count-all-properties');
        console.log(response.data);
        
        setCount(response.data);
      } catch (error) {
        console.log(error.message);
        
      } 
    };

    fetchDocumentCount();
  }, []);


    // Total number of users
    useEffect(() => {
      const fetchDocumentCount = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/user/total-users');
          console.log(response.data);
          
          setCountUser(response.data.message);
        } catch (error) {
          console.log(error.message);
          
        } 
      };
  
      fetchDocumentCount();
    }, []);

    // Total number of active properties
    useEffect(() => {
      const fetchDocumentCount = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/property/count-active-properties');
          console.log(response.data);
          
          setCountActive(response.data.count);
        } catch (error) {
          console.log(error.message);
          
        } 
      };
  
      fetchDocumentCount();
    }, []);

    
    // Total number of pending properties
    useEffect(() => {
      const fetchDocumentCount = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/property/count-pending-properties');
          console.log(response.data);
          
          setCountPending(response.data.count);
        } catch (error) {
          console.log(error.message);
          
        } 
      };
  
      fetchDocumentCount();
    }, []);
  
  return (
    <div>
      <div className="dashboard-bg">
        <div className="dashboard-head">
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 bg-primary sidebar">
            <div>
              <ul>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-decoration-none menu-item"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/" className=" text-decoration-none menu-item">
                    Home
                  </Link>
                </li>
                {
                  isAuthenticated === "admin" && (
                    <li>
                      <Link
                        to="/add-property"
                        className=" text-decoration-none menu-item"
                      >
                        Add Property
                      </Link>
                    </li>
                  )
                }
                {
                  isAuthenticated === "admin" && (
                    <li>
                      <Link
                        to="/manage-property"
                        className=" text-decoration-none menu-item"
                      >
                        Manage Property
                      </Link>
                    </li>
                  )
                }
                <li>
                  <Link to="/list-properties" className=" text-decoration-none menu-item">
                    List Properties
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={logout}
                    className="btn log  menu-item"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-2 mt-4 text-center">
            <img src={assets.avatar1} alt="" />
            <br/>
            <h3 className="text-center mt-4 mb-6">Welcome {userInfo?.name}</h3>
            <br/>
            <h6>
              Click <Link to = '/list-properties' className="fw-bold">here</Link> to see listed properties
            </h6>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-4 mt-4">
            <div className="row justify-content-around gy-4">
            <div className="col-md-5 stathome d-flex justify-content-between">
              <div>
              <h1>{count}</h1>
              <p className="text-center">No. of Properties</p>
              </div>
              <FaHome className="fahome" />
            </div>
            <div className="col-md-5 statusers d-flex justify-content-between">
              <div>
              <h1>{countUser}</h1>
              <p className="text-center">No. of users</p>
              </div>
              <FaUsers  className="fahome"/>
            </div>
            <div className="col-md-5 statactive d-flex justify-content-between">
              <div>
              <h1>{countActive}</h1>
              <p className="text-center">Active properties</p>
              </div>
              <FaHome className="fahome" />
            </div>
            <div className="col-md-5 statpending d-flex justify-content-between">
              <div>
              <h1>{countPending}</h1>
              <p className="text-center">Pending properties</p>
              </div>
              <FaHome className="fahome" />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
