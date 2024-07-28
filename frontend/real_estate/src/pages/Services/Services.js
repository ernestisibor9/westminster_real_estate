import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import "./Services.css";
import { assets } from "../../assets/asset";

function Services() {
  return (
    <div>
      <Navbar />
      <div className="dashboard-bg">
        <div className="dashboard-head">
          <h1>Services</h1>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center gy-4">
          <div className="text-center mb-5">
            <h3>Our Services</h3>
            <p>
              At WebMinster Real Estate Company, we offer a wide range of
              services to meet all your real estate needs.
            </p>
          </div>
          <div className="col-md-4">
            <div className="card shadow hover-image">
              <div className="card-body">
                <img
                  src={assets.house1}
                  alt=""
                  className="my-img "
                />
                <div className="text-center">
                  <h5 className="pt-2">Buying a Home</h5>
                  <p>
                    Finding your dream home is our top priority. 
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow hover-image">
              <div className="card-body">
                <img
                  src={assets.house2}
                  alt=""
                  className="my-img "
                />
                <div className="text-center">
                  <h5 className="pt-2">Selling Your Home</h5>
                  <p>
                    We make selling your home a smooth and profitable process.. 
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow hover-image">
              <div className="card-body">
                <img
                  src={assets.house3}
                  alt=""
                  className="my-img "
                />
                <div className="text-center">
                  <h5 className="pt-2">Renting and Leasing</h5>
                  <p>
                    We help you rent and lease your properties 
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow hover-image">
              <div className="card-body">
                <img
                  src={assets.house4}
                  alt=""
                  className="my-img "
                />
                <div className="text-center">
                  <h5 className="pt-2">Investment Properties</h5>
                  <p>
                  We help investors find lucrative real estate opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow hover-image">
              <div className="card-body">
                <img
                  src={assets.house5}
                  alt=""
                  className="my-img "
                />
                <div className="text-center">
                  <h5 className="pt-2">Relocation Services</h5>
                  <p>
                  Moving to a new area? We make the transition easy
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow hover-image">
              <div className="card-body">
                <img
                  src={assets.smallavatar4}
                  alt=""
                  className="my-img "
                />
                <div className="text-center">
                  <h5 className="pt-2">Customer Support</h5>
                  <p>
                  Our commitment to exceptional service extends beyond the transaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
