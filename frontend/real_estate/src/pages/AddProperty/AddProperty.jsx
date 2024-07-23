import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./AddProperty.css";

function AddProperty() {


  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [location, setLocation] = useState();
  const [featured, setFeatured] = useState(false);
  const [available, setAvailable] = useState(false);
  const [image, setImage] = useState(null);

  // handleSubmit - to connect the backend to the frontend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("image", image);
    formData.append("featured", featured);
    formData.append("available", available);

    if (
      title === "" ||
      description === "" ||
      price === "" ||
      image === "" ||
      location === ""
    ) {
      toast.error("Fields cannot be empty");
      return;
    } else {
      try {
        const token = JSON.parse(localStorage.getItem("user"));
        const response = await axios.post(
          "http://localhost:5000/api/property/create-properties",
          formData,
          {
            headers: {
                Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data.property);
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
            <form action="" onSubmit={handleSubmit}>
              <div className="card">
                <h3 className="text-center pt-3">Add Property</h3>
                <div className="card-body">
                  <div class="row mb-3">
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
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
                        onChange={(e) => setPrice(e.target.value)}
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
                        onChange={(e) => setImage(e.target.files[0])}
                        aria-label="First name"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        onChange={(e) => setLocation(e.target.value)}
                        id=""
                        placeholder="Location"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                    <small>Description</small>
                    <textarea
                      class="form-control"
                      name="description"
                      onChange={(e) => setDescription(e.target.value)}
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="featured"
                          checked={featured} 
                          onChange={(e) => setFeatured(e.target.checked)}
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
                          name="available"
                          checked={available} 
                          onChange={(e) => setAvailable(e.target.checked)}
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
