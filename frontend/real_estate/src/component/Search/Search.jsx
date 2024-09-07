import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";

import { FaSearch, FaCarSide } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

import "./Search.css";

function Search() {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [propertyFor, setPropertyFor] = useState("");
  const [propertyTypes, setPropertyTypes] = useState("");
  const [show, setShow] = useState(false);

  const categories = ["buy", "rent", "lease"];

  const categoryTypes = ["building", "flat", "land"];

  // Search properties
  const [query, setQuery] = useState("");
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Toggle cancel button
  const toggleComponent = () => {
    setShow(false);
  };

  // Handle search2 - to search for properties based on location
  const handleSearch2 = async (query) => {
    if (query === "") {
      setFeaturedProperties([]);
      setShow(false);
      console.log(query);
    }
    if (!query) {
      setFeaturedProperties([]);
      setLoading(false);
      setShow(false);
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
      setShow(true);
    } catch (err) {
      setError("No such property");
      console.error(err);
      setShow(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearch2(query);
  }, [query]);

   // Handle search - to search for properties based on location
  const handleSearch = async (query) => {
    if (!query) {
      setFeaturedProperties([]);
      setLoading(false);
      setShow(false);
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
      setShow(true);
    } catch (err) {
      setError("No such property");
      console.error(err);
      setShow(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  // Transaction of properties based on buy,rent,lease
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

    // Filter Property Types
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
      <section class="container-fluid bg-danger rounded-top position-relative top-t p-3">
        <div class="row justify-content-center mx-auto">
          <form onSubmit={handleSearch2}>
            <div className="d-flex">
              <div class="col-9">
                <input
                  type="text"
                  class="form-control bg-white rounded-3 shadow border-0 location"
                  placeholder="Search Property By Location"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div class="col-2 car-con">
                <FaCarSide className="fa-car" />
                <FiMapPin className="fa-map" />
              </div>
            </div>
          </form>
        </div>
      </section>

      {show && (
        <section>
          <div className="cancel" onClick={toggleComponent}>
            <MdCancel style={{ fontSize: "2.3rem", cursor: "pointer" }} />
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
                        <option selected>Search by transaction</option>
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
        </section>
      )}
    </div>
  );
}

export default Search;
