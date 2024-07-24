import React, { useEffect, useState } from "react";
// import { assets } from "../../assets/asset";
import "./FeaturedProperties.css"
import axios from "axios";
import { Link } from "react-router-dom";


function FeaturedProperties() {
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




  return (
    <div className="container mt-5">
      <div className="row justify-content-center text-center">
        <h3 className="text-center">List of Properties</h3>
        {featuredProperties.map((property)=>{
          return(
            <div className="col-md-4 mt-3">
          <div className="card shadow">
            <div className="card-body">
              <Link to ='' className="feat-style">
              {property.image.length > 0 && (
                            // <img
                            //     src={product.images[0]}
                            //     alt={`product-${index}-image-0`}
                            //     style={{ width: '200px', height: '200px', objectFit: 'cover', margin: '10px' }}
                            // />
                            <img src={require(`../../images/${property.image[0]}`)} alt="" className="img-fluid hover-image" />
                        )}
              {/* <img src={require(`../../images/${property.image}`)} alt="" className="img-fluid hover-image" /> */}
              {/* {
                property.image.map((item)=>{
                  return(
                    <img src={require(`../../images/${item}`)} alt="" className="img-fluid hover-image" />
                  )
                })
              } */}
              <h5>{property?.title}</h5>
              <p>
                {property?.description}
              </p>
              </Link>
            </div>
          </div>
        </div>
          )
        })}
      </div>
    </div>
  );
}

export default FeaturedProperties;
