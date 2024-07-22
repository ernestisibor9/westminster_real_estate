import React from "react";
import { assets } from "../../assets/asset";
import "./FeaturedProperties.css"

function FeaturedProperties() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-centent">
        <h3 className="text-center">Featured Properties</h3>
        <div className="col-md-4 mt-3">
          <div className="card shadow">
            <div className="card-body">
              <img src={assets.house1} alt="" className="img-fluid hover-image" />
              <h5>Home Addition</h5>
              <p>
                We invite you to explore our website, browse our listings, and
                learn more about the services we offer.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div className="card shadow">
            <div className="card-body">
              <img src={assets.house1} alt="" className="img-fluid hover-image" />
              <h5>Home Addition</h5>
              <p>
                We invite you to explore our website, browse our listings, and
                learn more about the services we offer.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div className="card shadow">
            <div className="card-body">
              <img src={assets.house1} alt="" className="img-fluid hover-image" />
              <h5>Home Addition</h5>
              <p>
                We invite you to explore our website, browse our listings, and
                learn more about the services we offer.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div className="card shadow">
            <div className="card-body">
              <img src={assets.house1} alt="" className="img-fluid hover-image" />
              <h5>Home Addition</h5>
              <p>
                We invite you to explore our website, browse our listings, and
                learn more about the services we offer.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div className="card shadow">
            <div className="card-body">
              <img src={assets.house1} alt="" className="img-fluid hover-image" />
              <h5>Home Addition</h5>
              <p>
                We invite you to explore our website, browse our listings, and
                learn more about the services we offer.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div className="card shadow">
            <div className="card-body">
              <img src={assets.house1} alt="" className="img-fluid hover-image" />
              <h5>Home Addition</h5>
              <p>
                We invite you to explore our website, browse our listings, and
                learn more about the services we offer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProperties;
