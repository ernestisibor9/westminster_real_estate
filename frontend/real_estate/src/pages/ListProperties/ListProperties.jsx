import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import "./ListProperties.css";
import { FaSearch } from "react-icons/fa";

function ListProperties() {
  const [featuredProperties, setFeaturedProperties] = useState([]);

  // Search properties
  const [query, setQuery] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    if (!query) {
        setFeaturedProperties([]);
        setLoading(false);
        return;
    }
    setLoading(true);
    setError('');
    try {
        const response = await axios.post("http://localhost:5000/api/property/search-by-location", { query });
        setFeaturedProperties(response.data);
    } catch (err) {
        setError('Error fetching properties');
        console.error(err);
    }
    setLoading(false);
};

useEffect(() => {
    handleSearch(query);
}, [query]);

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
      <Navbar />
      <div className="dashboard-bg">
        <div className="dashboard-head">
          <h1>Properties</h1>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center text-center">
          <h3 className="text-center">List of Properties</h3>
          <div className="d-flex">
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
              <FaSearch class="search-icon"/>
              <div className="">
              <select class="form-select sel" aria-label="Default select example">
  <option selected disabled>Search by</option>
  <option value="1">Buy</option>
  <option value="2">Rent</option>
  <option value="3">Lease</option>
</select>
              </div>
            </div>
          </div>
          {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
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
                          className="img-fluid hover-image"
                        />
                      )}
                      <h5>{property?.title}</h5>
                      <p>{property?.description}</p>
                      <h6>Location: {property?.location}</h6>
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
