// import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
// import Search from "../Search/Search";

function Navbar() {
  // useState for active menu
  const [activeMenuItem, setActiveMenuItem] = useState("");
  // useState for authentication
  const [isAuthenticated, setIsAuthenticated] = useState();
 
  // useNavigate for navigation
  const navigate = useNavigate();

  // Logout functionality
  const logout = () => {
    localStorage.removeItem("user");
    // window.location.href = "/";
    navigate("/login");
  };

  // Get users details from the token generated
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
      // toast.error(error);
      console.log(error);
    }
  };

  // getPersonData() is invoked in the useEffect method
  useEffect(() => {
    getPersonData();
  });

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  //  Add PropertyOwner Details to the Database
  const propertyOwner = {
    ownerName: "",
    email: "",
    phone: "",
    transaction: "",
    description: "",
    price: "",
    location: "",
    c: "",
  };
  const [user, setUser] = useState(propertyOwner);
  // Function to get whatsover the user type
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  // handleSubmit - to connect the backend to the frontend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      user.ownerName === "" ||
      user.email === "" ||
      user.price === "" ||
      user.phone === "" ||
      user.location === "" ||
      user.propertyTypes === "" ||
      user.description === "" ||
      user.propertyFor === ""
    ) {
      toast.error("Fields cannot be empty");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/owner-property/owner-property",
          user
        );
        console.log(response);
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <nav class="navbar sticky-top navbar-expand-lg ">
        <div class="container-fluid">
          <Link to="/" class="navbar-brand">
            <span className="text-dark fw-bold">Property</span>
            <span className="text-danger fw-bold">Paddy</span>
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
            <FaBars className="fabars" />
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li
                className={`nav-item ${
                  activeMenuItem === "home" ? "active" : ""
                }`}
                onClick={() => handleMenuItemClick("home")}
              >
                <Link to="/" class="nav-link" aria-current="page">
                  Home
                </Link>
              </li>
              <li
                className={`nav-item ${
                  activeMenuItem === "about" ? "active" : ""
                }`}
                onClick={() => handleMenuItemClick("about")}
              >
                <Link to="/about" class="nav-link">
                  About
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/buy-property" class="nav-link">
                  Buy
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/rent-property" class="nav-link">
                  Rent
                </Link>
              </li>
              <li class="nav-item">
                <Link to='/lease-property' class="nav-link">
                  Lease
                </Link>
              </li>
              <li class="nav-item dropdown">
                <Link
                  to="#"
                  class="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Property
                </Link>
                <ul class="dropdown-menu">
                  <li>
                    <Link to="/list-property" class="dropdown-item">
                      Properties
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="btn dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Property Owner
                    </button>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <Link to="/contact" class="nav-link">
                  Contact
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li class="nav-item">
                    <button
                      type="button"
                      onClick={logout}
                      class="btn btn-danger"
                    >
                      Logout
                    </button>
                  </li>
                  <li class="nav-item">
                    <Link to="/dashboard" class="btn btn-danger">
                      Dashboard
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li class="nav-item">
                    <Link to="/login" class="btn btn-danger">
                      Login
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/register" class="btn btn-danger">
                      SignUp
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/*    */}

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Property Owner Form
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div class="modal-body p-4">
                <div class="row mb-3">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Owner's FullName"
                      name="ownerName"
                      onChange={inputChangeHandler}
                    />
                  </div>
                  <div class="col">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                      name="email"
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Phone Number"
                      name="phone"
                      onChange={inputChangeHandler}
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="location"
                      name="location"
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      name="propertyTypes"
                      onChange={inputChangeHandler}
                    >
                      <option selected disabled>
                        Property Type
                      </option>
                      <option value="building">Building</option>
                      <option value="land">Land</option>
                      <option value="flat">Flat</option>
                    </select>
                  </div>
                  <div class="col">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      name="transaction"
                      onChange={inputChangeHandler}
                    >
                      <option selected disabled>
                        Transaction Type
                      </option>
                      <option value="building">Buy</option>
                      <option value="rent">Rent</option>
                      <option value="lease">Lease</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-2">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Price of Property &nbsp;&nbsp; &pound;1000"
                      name="price"
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Property Description
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="description"
                    onChange={inputChangeHandler}
                  ></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
