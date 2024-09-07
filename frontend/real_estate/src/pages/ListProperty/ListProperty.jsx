import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./ListProperty.css";
import { FaSearch } from "react-icons/fa";
// import { toast } from "react-toastify";

function ListProperty() {
  const [isAuthenticated, setIsAuthenticated] = useState();

  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [propertyFor, setPropertyFor] = useState("");
  const [propertyTypes, setPropertyTypes] = useState("");

  const categoryTypes = ["shared apartment", "flat", "land"];

  const categories = ["buy", "rent", "lease", "short let"];

  // Get user's details from the token generated
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
        setIsAuthenticated(response.data.user.role);
        // console.log(userInfo);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPersonData();
  });

  // Search properties
  const [query, setQuery] = useState("");
  //   const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Search properties based on location
  const handleSearch = async (query) => {
    if (!query) {
      setFeaturedProperties([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/property/search-by-location",
        { query }
      );
      setFeaturedProperties(response.data);
    } catch (err) {
      setError("No such property");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  // Search properties based on transaction - buy, rent, lease
  const handleFilter = async (propertyFor) => {
    if (!propertyFor) {
      setFeaturedProperties([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/property/search-for",
        { propertyFor }
      );
      setFeaturedProperties(response.data);
    } catch (err) {
      setError("No such property");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFilter(propertyFor);
  }, [propertyFor]);

  // Property types
  const handleFilterTypes = async (propertyTypes) => {
    if (!propertyTypes) {
      setFeaturedProperties([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/property/search-types",
        { propertyTypes }
      );
      setFeaturedProperties(response.data);
    } catch (err) {
      setError("No such property");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFilterTypes(propertyTypes);
  }, [propertyTypes]);

  // Get All Featured Poperties
  const getAllFeaturedProperties = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/property/get-all-properties"
    );
    setFeaturedProperties(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    getAllFeaturedProperties();
  }, []);

  let limitFeatured = featuredProperties.slice(0, 12);

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
          <h1>List Of Properties</h1>
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
                {isAuthenticated === "admin" && (
                  <li>
                    <Link
                      to="/add-property"
                      className="menu-item text-decoration-none"
                    >
                      Add Property
                    </Link>
                  </li>
                )}
                {isAuthenticated === "admin" && (
                  <li>
                    <Link
                      to="/manage-property"
                      className="menu-item text-decoration-none"
                    >
                      Manage Property
                    </Link>
                  </li>
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
                    className="btn log"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-8 mt-4">
            <div className="d-flex mt-3">
              <div className="d-flex">
                <input
                  type="text"
                  name=""
                  className="form-control"
                  id="search"
                  placeholder="Search by location"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <FaSearch class="search-icon" />
                <div className="">
                  <form action="">
                    <select
                      class="form-select sel"
                      value={propertyFor}
                      onChange={(e) => setPropertyFor(e.target.value)}
                    >
                      <option selected disabled>
                        Search to
                      </option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          Search to {cat}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
              </div>
              <div>
                <form action="">
                  <select
                    class="form-select sel"
                    value={propertyTypes}
                    onChange={(e) => setPropertyTypes(e.target.value)}
                  >
                    <option selected>Search by types</option>
                    {categoryTypes.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
            </div>
            <div className="mt-3 text-danger fw-bold">
              {loading && <p className="text-success">Loading...</p>}
              {error && <p className="text-danger">{error}</p>}
            </div>
            {/*  */}
            <div className="row justify-content-center">
              {limitFeatured.map((property) => {
                return (
                  <div className="col-md-4 mt-3">
                    <div className="card shadow">
                      <div className="card-body">
                        <Link to="" className="feat-style">
                          {property.image.length > 0 && (
                            <img
                              src={require(`../../images/${property.image[0]}`)}
                              alt=""
                              className="hover-image my-img"
                            />
                          )}
                          <h6 className="text-center pt-3">
                            Title: {property?.title}
                          </h6>
                          <p className="text-center">
                            Transation: {property?.propertyFor}
                          </p>
                          <p className="text-center">
                            Type: {property?.propertyTypes}
                          </p>
                          <p className="text-center">
                            Location: {property?.location}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
}

export default ListProperty;
