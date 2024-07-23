import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Dashboard.css"
import { assets } from "../../assets/asset";


function Dashboard() {
  const [userInfo, setUserInfo] = useState();

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
      if(response.data.success){
        setUserInfo(response.data.user);
        console.log(userInfo);
      }
      else{
        toast.error('Invalid authorization');
      }
    } 
    catch (error) {
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
    // window.location.href = "/";

    navigate("/login");
  };
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
                            <li><Link to='/add-property' className="text-white text-decoration-none">Add Property</Link></li>
                            <li><Link to='' className="text-white text-decoration-none">Users</Link></li>
                            <li><Link to=''  className="text-white text-decoration-none">Settings</Link></li>
                            <li><button type="button" onClick={logout} className="btn log text-white">Logout</button></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-2 mt-4 text-center">
                    <img src={assets.avatar1} alt="" />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-4">
                <h3 className="text-center mt-4 mb-5">Welcome {userInfo?.name}</h3>
                <h6><span className="fw-bold">Name:</span> {userInfo?.name}</h6>
                <h6><span className="fw-bold">Email:</span> {userInfo?.email}</h6>
                <h6><span className="fw-bold">Phone:</span> {userInfo?.phone}</h6>
                </div>
            </div>
        </div>
      <h1>Dashboard</h1>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
