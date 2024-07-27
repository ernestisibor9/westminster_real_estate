import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import "./ListProperties.css";
import { FaSearch } from "react-icons/fa";

function ListProperties() {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [propertyFor, setPropertyFor] = useState('');

  const categories = ["buy", "rent", "lease"]; 

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
        setError('No such property');
        console.error(err);
    }
    setLoading(false);
};

useEffect(() => {
    handleSearch(query);
}, [query]);


// Property for
const handleFilter = async (propertyFor) => {
  if (!propertyFor) {
      setFeaturedProperties([]);
      setLoading(false);
      return;
  }
  setLoading(true);
  setError('');
  try {
      const response = await axios.post('http://localhost:5000/api/property/search-for', { propertyFor });
      setFeaturedProperties(response.data);
  } catch (err) {
      setError('No such property');
      console.error(err);
  }
  setLoading(false);
};

useEffect(() => {
  handleFilter(propertyFor);
}, [propertyFor]);

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
              <FaSearch class="search-icon"/>
              <div className="">
              <form action="">
              <select class="form-select sel" value={propertyFor} onChange={(e) => setPropertyFor(e.target.value)}>
  <option selected disabled>Search to</option>
  {categories.map(cat => (
                    <option key={cat} value={cat}>Search to {cat}</option>
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
