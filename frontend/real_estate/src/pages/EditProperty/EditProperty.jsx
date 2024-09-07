import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./EditProperty.css";

function EditProperty() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [admin, setAdmin] = useState("");
  const [propertyTypes, setPropertyTypes] = useState("");
  const [propertyFor, setPropertyFor] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    getOneProperty();
  }, [id]); // Add `id` as a dependency so it only runs when `id` changes

  useEffect(() => {
    getPersonData();
  }, []); // Empty dependency array means it runs only on mount

  const getOneProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/property/get-single-property/${id}`
      );
      setTitle(response.data.title);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setLocation(response.data.location);
      setPropertyTypes(response.data.propertyTypes);
      setPropertyFor(response.data.propertyFor);
      setImage(response.data.image);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching property details.");
    }
  };

  const getPersonData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"));
      if (!token) {
        navigate("/login");
        return;
      }

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
        setIsAuthenticated(response.data.user.role);
      } else {
        toast.error("Invalid authorization");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Error authenticating user.");
      console.error(error);
      navigate("/login");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImage(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !location) {
      toast.error("Fields cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("propertyTypes", propertyTypes);
    formData.append("propertyFor", propertyFor);
    formData.append("admin", admin);

    if (image.length > 0) {
      image.forEach((img) => formData.append("image", img));
    }

    try {
      const token = JSON.parse(localStorage.getItem("user"));
      const response = await axios.put(
        `http://localhost:5000/api/property/update-multiple-images/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating property.");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <div className="dashboard-bg">
        <div className="dashboard-head">
          <h1>Edit Property</h1>
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
                  <Link to="/" className=" text-decoration-none menu-item">
                    Home
                  </Link>
                </li>
                {isAuthenticated === "admin" && (
                  <>
                    <li>
                      <Link
                        to="/add-property"
                        className="menu-item text-decoration-none"
                      >
                        Add Property
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/manage-property"
                        className="menu-item text-decoration-none"
                      >
                        Manage Property
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link
                    to="/list-properties"
                    className="menu-item text-decoration-none"
                  >
                    List Properties
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={logout}
                    className="btn log menu-item"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-8 mt-4">
            <form onSubmit={handleSubmit}>
              <div className="card">
                <h3 className="text-center pt-3">Edit Property</h3>
                <div className="card-body">
                  <input
                    type="hidden"
                    className="form-control"
                    name="admin"
                    value={admin}
                    onChange={(e) => setAdmin(e.target.value)}
                  />
                  <div className="row mb-3">
                    <div className="col">
                      <small>Property Title</small>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                      />
                    </div>
                    <div className="col">
                      <small>Price</small>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <small>Property Type</small>
                      <select
                        className="form-select"
                        name="propertyTypes"
                        value={propertyTypes}
                        onChange={(e) => setPropertyTypes(e.target.value)}
                      >
                        <option disabled>Select Property Type</option>
                        <option value="land">Land</option>
                        <option value="flat">Flat</option>
                        <option value="shared apartment">
                          Shared Apartment
                        </option>
                      </select>
                    </div>
                    <div className="col">
                      <small>Property For</small>
                      <select
                        className="form-select"
                        name="propertyFor"
                        value={propertyFor}
                        onChange={(e) => setPropertyFor(e.target.value)}
                      >
                        <option disabled>Property For</option>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                        <option value="lease">Lease</option>
                        <option value="short let">Short Let</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <small>Upload Photo</small>
                    <div className="col">
                      <input
                        type="file"
                        multiple
                        className="form-control"
                        name="image"
                        onChange={handleImageChange}
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
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <small>Description</small>
                      <textarea
                        className="form-control"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                  <div className="d-grid gap-2 mt-4 mb-2">
                    <button className="btn btn-primary" type="submit">
                      Update Property
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

export default EditProperty;
