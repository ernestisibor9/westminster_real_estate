import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from '../../component/Navbar/Navbar'
import './ListProperties.css'

function ListProperties() {
    const [featuredProperties, setFeaturedProperties] = useState([]);
    console.log(featuredProperties);
  
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
  
    let limitFeatured = featuredProperties.slice(0,12)
  return (
    <div>
      <Navbar/>
      <div className="dashboard-bg">
        <div className="dashboard-head">
          <h1>Properties</h1>
        </div>
      </div>
      <div className="container mt-5">
      <div className="row justify-content-center text-center">
        <h3 className="text-center">List of Properties</h3>
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
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  )
}

export default ListProperties
