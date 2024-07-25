import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div>
      <div className="herobg">
        <div class="container">
          <div class="col-md-12">
            <h1 className="agent">
              Buy. Rent. <br />
              Lease Properties.
            </h1> <br/>
            <Link to = '/list-property' type="button" className="btn btn-outline-light">Explore Properties</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
