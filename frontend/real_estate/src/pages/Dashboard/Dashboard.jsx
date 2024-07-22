import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css"


function Dashboard() {
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
                            <li><Link to='' className="text-white text-decoration-none">Properties</Link></li>
                            <li><Link to='' className="text-white text-decoration-none">Users</Link></li>
                            <li><Link to=''  className="text-white text-decoration-none">Settings</Link></li>
                            <li><button type="button" onClick={logout} className="btn log text-white">Logout</button></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-10">
                    <p>Good girl gone bad</p>
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
