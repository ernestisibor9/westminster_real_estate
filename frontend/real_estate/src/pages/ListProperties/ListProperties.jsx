import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Navbar from "../../component/Navbar/Navbar";
import "./ListProperties.css";
import { FaSearch } from "react-icons/fa";

function ListProperties() {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [propertyFor, setPropertyFor] = useState("");
  const [propertyTypes, setPropertyTypes] = useState("");

  const categories = ["buy", "rent", "lease", "short let "];

  const categoryTypes = ["shared apartment", "flat", "land"];

  // Search properties
  const [query, setQuery] = useState("");
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

  // Search properties based on the transaction - buy, rent, lease
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


// Seacrh properties based on Property types
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
  return (
    <div>
      {/* <Navbar /> */}
      <div className="dashboard-bg">
        <div className="dashboard-head">
          <h1>Properties</h1>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center text-center">
          <h3 className="text-center">List of Properties</h3>
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
                    <option selected>
                      Search by transaction
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        Search to {cat}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
              <div>
              <form action="">
                  <select
                    class="form-select sel"
                    value={propertyTypes}
                    onChange={(e) => setPropertyTypes(e.target.value)}
                  >
                    <option selected >
                      Search by types
                    </option>
                    {categoryTypes.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-3 text-danger fw-bold">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
          </div>
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
                          className="my-img hover-image"
                        />
                      )}
                      <h6 className="text-center pt-3">Title: {property?.title}</h6>
                      <p className="text-center">Transation: {property?.propertyFor}</p>
                      <p className="text-center">Type: {property?.propertyTypes}</p>
                      <p className="text-center">Location: {property?.location}</p>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ListProperties;
