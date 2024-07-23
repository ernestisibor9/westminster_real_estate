import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

import "./AddProperty.css";

function AddProperty() {
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
          <h1>Add Property</h1>
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
                  <Link to="" className="text-white text-decoration-none">
                    Users
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
          <div className="col-md-8 mt-4">
            <form action="">
              <div className="card">
                <h3 className="text-center pt-3">Add Property</h3>
                <div className="card-body">
                  <div class="row mb-3">
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        name="title"
                        placeholder="Title"
                        aria-label="title"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Price"
                        name="price"
                        aria-label="price"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <small>Upload Photo</small>
                    <div class="col">
                      <input
                        type="file"
                        class="form-control"
                        name="image"
                        aria-label="First name"
                      />
                    </div>
                    <div class="col">
                      <textarea
                        class="form-control"
                        name="description"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      >
                        Description
                      </textarea>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="true"
                          id="featuredProperty"
                        />
                        <label class="form-check-label" for="featuredProperty">
                          Featured Property
                        </label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="true"
                          id="availableProperty"
                        />
                        <label class="form-check-label" for="availableProperty">
                          Available Property
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="d-grid gap-2 mt-4 mb-2">
                    <button class="btn btn-primary" type="submit">
                      Add Property
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
}

export default AddProperty;
