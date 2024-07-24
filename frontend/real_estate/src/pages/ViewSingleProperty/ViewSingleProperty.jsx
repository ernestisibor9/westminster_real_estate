import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

import "./ViewSingleProperty.css";
// import { assets } from "../../assets/asset";

function ViewSingleProperty() {
  const [singleProperty, setSingleProperty] = useState();

  const { id } = useParams();

  // API to get individual property

  const getOneProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/property/get-single-property/${id}`
      );
      console.log(response.data);
      setSingleProperty(response.data);
    } catch (err) {}
  };

  useEffect(() => {
    getOneProperty();
  });

  const navigate = useNavigate();
  // logout
  const logout = () => {
    localStorage.removeItem("user");
    // window.location.href = "/";

    navigate("/login");
  };

  let imageSrc;
  try {
    imageSrc = require(`../../images/${singleProperty?.image}`);
  } catch (err) {
    console.error("Image not found:", err);
    imageSrc = require("../../images/propertyphoto.png"); // fallback to a default image
  }

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
                    to="/add-property"
                    className="text-white text-decoration-none"
                  >
                    Add Property
                  </Link>
                </li>
                <li>
                  <Link
                    to="/manage-property"
                    className="text-white text-decoration-none"
                  >
                    Manage Property
                  </Link>
                </li>
                <li>
                  <Link to="" className="text-white text-decoration-none">
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={logout}
                    className="btn log text-white"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-3 mt-4 text-center">
            <img src={imageSrc} alt="" className="img-fluid" />
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-4 mt-4">
            <h6>
              <span className="fw-bold">Property Title:</span>{" "}
              {singleProperty?.title}
            </h6>
            <h6>
              <span className="fw-bold">Description:</span>{" "}
              {singleProperty?.description}
            </h6>
            <h6>
              <span className="fw-bold">Location:</span>{" "}
              {singleProperty?.location}
            </h6>
            <h6>
              <span className="fw-bold">Price:</span> &pound;
              {singleProperty?.price}
            </h6>
            <h6>
              <span className="fw-bold">Agent Name:</span>{" "}
              {singleProperty?.admin?.name}
            </h6>
            <h6>
              <span className="fw-bold">Phone:</span>{" "}
              {singleProperty?.admin?.phone}
            </h6>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
}

export default ViewSingleProperty;
