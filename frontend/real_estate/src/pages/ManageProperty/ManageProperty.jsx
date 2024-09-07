import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";


import "./ManageProperty.css";
// import { assets } from "../../assets/asset";

function ManageProperty() {
  const [isAuthenticated, setIsAuthenticated] = useState();

  const [userInfo, setUserInfo] = useState();
  const [allProperties, setAllProperties] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // Get user details from token generated
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

   // Delete Product
   const deleteProperty = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"));
      const response = await axios.delete(
        `http://localhost:5000/api/property/delete-property/${id}`,  {
          data: { image: selectedImages },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
      }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setSelectedImages([]);
        getAllProperties();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Toggle status
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'pending' : 'active';
    try {
        const response = await axios.put(`http://localhost:5000/api/property/update-property-status/${id}`, {
            status: newStatus
        });
        if(response.data.success){
          getAllProperties();
          toast.success('Property status updated')
        }
    } catch (error) {
        console.error('Error updating property status:', error.message);
    }
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
                    className="menu-item text-decoration-none"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/" className="menu-item text-decoration-none">
                    Home
                  </Link>
                </li>
                {
                  isAuthenticated === "admin" && (
                    <li>
                      <Link
                        to="/add-property"
                        className="menu-item text-decoration-none"
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
                        className="menu-item text-decoration-none"
                      >
                        Manage Property
                      </Link>
                    </li>
                  )
                }
                <li>
                  <Link to="/list-properties" className="menu-item text-decoration-none">
                    List Properties
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={logout}
                    className="btn log "
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-8 mt-4 text-center">
            <div className="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Photo</th>
                  <th scope="col">Property Title</th>
                  <th scope="col">Location</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
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
                      <td>&pound;{property.price.toFixed(2)}</td>
                      <td>
                        {
                          property.status === 'pending' ? (
                            <span className="badge text-bg-warning">{property.status}</span>
                          ) : (
                            <span className="badge text-bg-success">{property.status}</span>
                          )
                        }
                      </td>
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
                          to={`/edit-property/${property._id}`}
                          className="p-2 fs-5 text-primary"
                          title="Edit Property"
                        >
                          <FaEdit />
                        </Link>
                        <Link 
                          className="p-2 fs-5 text-danger"
                          title="Delete Property"
                          onClick={()=>deleteProperty(property._id)}
                        >
                          <MdDelete />
                        </Link>
                        {/* <button className="btn btn-primary" onClick={() => toggleStatus(property._id, property.status)}>
                        {property.status === 'active' ? 'Set as Pending' : 'Set as Active'}
                        </button> */}
                        <Link
                          className="p-2 fs-5 text-tertiary "
                          title="Change Status"
                          onClick={() => toggleStatus(property._id, property.status)}>
                            <MdNotificationsActive />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
}

export default ManageProperty;
