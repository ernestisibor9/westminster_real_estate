import React from "react";
import { assets } from "../../assets/asset";
import { Link } from "react-router-dom";
import "./WhoWeAre.css"

function WhoWeAre() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-5">
          <img src={assets.house3} alt="" className="img-fluid" />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-6">
          <h3>Who We Are</h3>
          <p>
            Welcome to Westminster Real Estate, where your property dreams
            become reality. Our mission is to provide exceptional real estate
            services with integrity, expertise, and a personal touch.
          </p>
          <p>
            Founded in 2010, Webminster Real Estate has grown from a small local
            agency to a leading real estate firm with a reputation for
            excellence. Our journey began with a passion for helping people find
            their perfect homes and has evolved into a comprehensive service
            that caters to all your real estate needs.
          </p>
          <h3>Why Choose Us</h3>
          <p>
            Choosing Webminster Real Estate means partnering with a team that is
            dedicated to your success. Our proven track record, client-centric
            approach, and deep understanding of the real estate market make us
            the preferred choice for buyers, sellers, and investors alike. We
            invite you to explore our website, browse our listings, and learn
            more about the services we offer.
          </p>
          <Link to="#" className="btn btn-danger">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WhoWeAre;
