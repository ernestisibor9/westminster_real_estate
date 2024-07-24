import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./AddProperty.css";
// import { assets } from "../../assets/asset";

function AddProperty() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [location, setLocation] = useState();
  const [admin, setAdmin] = useState();
  const [propertyTypes, setPropertyTypes] = useState();
  const [propertyFor, setPropertyFor] = useState();
  const [image, setImage] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  console.log(admin);

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
        setAdmin(response.data.user._id);
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

  // Handleupload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImage(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // handleSubmit - to connect the backend to the frontend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("propertyTypes", propertyTypes);
    formData.append("propertyFor", propertyFor);
    formData.append("admin", admin);
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }
    // formData.append("image", image);

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
          // setUploadedImg(true);
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
          <div className="col-md-8 mt-4">
            <form action="" onSubmit={handleSubmit}>
              <div className="card">
                <h3 className="text-center pt-3">Add Property</h3>
                <div className="card-body">
                  <input
                    type="hidden"
                    className="form-control"
                    name="admin"
                    id=""
                    value={admin}
                    onChange={(e) => setAdmin(e.target.value)}
                  />
                  <div class="row mb-3">
                    <div class="col">
                      <small>Property Title</small>
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
                    <small>Price</small>
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
                    <div class="col">
                    <small>Property Type</small>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        name="propertyTypes"
                        onChange={(e) => setPropertyTypes(e.target.value)}
                      >
                        <option disabled>Select Property Type</option>
                        <option value="land">Land</option>
                        <option value="building">Building</option>
                        <option value="flat">Flat</option>
                      </select>
                    </div>
                    <div class="col">
                    <small>Property For</small>
                    <select
                        class="form-select"
                        aria-label="Default select example"
                        name="propertyFor"
                        onChange={(e) => setPropertyFor(e.target.value)}
                      >
                        <option disabled>Property For</option>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                        <option value="lease">Lease</option>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <small>Upload Photo</small>
                    <div class="col">
                      <input
                        type="file"
                        multiple
                        class="form-control"
                        name="image"
                        onChange={handleImageChange}
                        aria-label="First name"
                      />
                      <div className="d-flex justify-content-around mt-4">
                        {imagePreviews.map((preview, index) => (
                          <img
                            key={index}
                            src={preview}
                            alt=""
                            className="img-fluid"
                            width={100}
                            height={100}
                          />
                        ))}
                      </div>
                      {/* <img
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : assets.propertyphoto
                        }
                        alt=""
                        width={100}
                        height={100}
                        className="mt-4 mb-3"
                      /> */}
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
