import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";

import "./SearchProperty.css";

function SearchProperty() {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [propertyFor, setPropertyFor] = useState("");
  const [propertyTypes, setPropertyTypes] = useState("");
  const [show, setShow] = useState(false);

  const categories = ["buy", "rent", "lease"];

  const categoryTypes = ["building", "flat", "land"];


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    // Toggle cancel button
    const toggleComponent = () => {
        setShow(false);
    };
    
  // Filter Properties Based on Transation
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
      setShow(true);
    } catch (err) {
      setError("No such property");
      setShow(false);
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFilter(propertyFor);
  }, [propertyFor]);

  // Filter properties based on Property types
  const handleFilterTypes = async (propertyTypes) => {
    if (!propertyTypes) {
      setFeaturedProperties([]);
      setLoading(false);
      setShow(false);
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
      setShow(true);
    } catch (err) {
      setError("No such property");
      setShow(false);
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
    setShow(true);
    console.log(response.data);
  };
  useEffect(() => {
    getAllFeaturedProperties();
  }, []);

  let limitFeatured = featuredProperties.slice(0, 12);
  return (
    <div>
      <section class="container-fluid p-3">
        <div class="row justify-content-center">
          <div class="col-md-3 align-items-center d-flex justify-content-around mx-3 p-2 shadow my-3 mt-md-0 fs-8">
            <i class="fa-solid fa-house ms-2 fs-7 text-danger"></i>
            <select
              class=" text-center w-75 border-0 active no-focus form- my-select"
              value={propertyFor}
              onChange={(e) => setPropertyFor(e.target.value)}
            >
              <option>Property To Buy</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div class="col-md-3 align-items-center d-flex justify-content-around mx-3 p-2 shadow my-3 mt-md-0 fs-8">
            <i class="fa-solid fa-tag fs-7 text-danger"></i>
            <select
              class="text-center w-75 border-0 active no-focus form-select my-select"
              value={propertyTypes}
              onChange={(e) => setPropertyTypes(e.target.value)}
            >
              <option>Property Type</option>
              {categoryTypes.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>


      {
        show && (
            <section>
            <div className="cancel" onClick={toggleComponent}>
                      <MdCancel style={{fontSize:'2.3rem', cursor:'pointer'}}/>
                      </div>
              <div className="mt-3 text-danger fw-bold text-center">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
              </div>
              <div className="container mt-3 mb-4">
                <div className="row justify-content-center">
                  {limitFeatured.map((property) => {
                    return (
                      <div className="col-md-4 mt-3">
                        <div className="card shadow">
                          <div className="card-body">
                            <Link to={`/property-details/${property._id}`} className="feat-style">
                              {property.image.length > 0 && (
                                <img
                                  src={require(`../../images/${property.image[0]}`)}
                                  alt=""
                                  className="my-img hover-image"
                                />
                                // <p>{property.title}</p>
                              )}
                              <div className="pt-3 text-center">
                    <p>Name: {property?.title}</p>
                    <p>Property Type: {property?.propetyTypes}</p>
                    {/* <p>Transaction: {property?.propertyFor}</p> */}
                    <p>Price: &#163;{property?.price.toFixed(2)}</p>
                    <p>Location: {property?.location}</p>
                    </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
        )
      }

    </div>
  );
}

export default SearchProperty;
