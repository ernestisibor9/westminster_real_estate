import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import "./ManageProperty.css";
// import { assets } from "../../assets/asset";

function ManageProperty() {
  const [userInfo, setUserInfo] = useState();
  const [allProperties, setAllProperties] = useState([]);

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
        console.log(userInfo);
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

  // Get All Poperties
  const getAllProperties = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/property/get-all-properties"
    );
    setAllProperties(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    getAllProperties();
  }, []);

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
          <h1>Manage Property</h1>
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
                    className="text-white text-decoration-none"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-property"
                    className="text-white text-decoration-none"
                  >
                    Add Property
                  </Link>
                </li>
                <li>
                  <Link to="" className="text-white text-decoration-none">
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
          <div className="col-md-8 mt-4 text-center">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Photo</th>
                  <th scope="col">Property Title</th>
                  <th scope="col">Location</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allProperties.map((property, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {property.image.length > 0 && (
                          <img
                            src={require(`../../images/${property.image[0]}`)}
                            alt=""
                            className=""
                            width={80}
                            height={70}
                          />
                        )}
                      </td>
                      <td>{property.title}</td>
                      <td>{property.location}</td>
                      <td>&pound;{property.price}</td>
                      {/* <td>{property.description(0, 20)}</td> */}
                      <td>
                        <Link
                          to={`/view-single-property/${property._id}`}
                          className="p-2 fs-5 text-success"
                          title="View Property"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          to=""
                          className="p-2 fs-5 text-primary"
                          title="Edit Property"
                        >
                          <FaEdit />
                        </Link>
                        <Link
                          to=""
                          className="p-2 fs-5 text-danger"
                          title="Delete Property"
                        >
                          <MdDelete />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
}

export default ManageProperty;
