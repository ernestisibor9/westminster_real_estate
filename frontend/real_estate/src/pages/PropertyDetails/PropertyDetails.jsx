import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropertyDetails.css";
// import Navbar from "../../component/Navbar/Navbar";

function PropertyDetails() {
  // Get the id for the property using useParams
  const { id } = useParams();

  const [singleProperty, setSingleProperty] = useState();

  // Get single property
  const getOneProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/property/get-single-property/${id}`
      );
      console.log(response.data);
      setSingleProperty(response.data);
    } catch (err) {}
  };

  useEffect(() => {
    getOneProperty();
  });
  return (
    <div>
      {/* <Navbar /> */}
      <div className="dashboard-bg">
        <div className="dashboard-head">
          <h1>Property Details</h1>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-12 d-flex">
            {singleProperty?.image.map((photo) => {
              return (
                <img
                  src={require(`../../images/${photo}`)}
                  alt=""
                  className=""
                  width={350}
                  height={320}
                />
              );
            })}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h5>Description</h5>
            <h6>{singleProperty?.description}</h6>
          </div>
          <div className="col-md-3">
            <h6>{singleProperty?.location}</h6>
          </div>
          <div className="col-md-3">
            <h6>{singleProperty?.price}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
