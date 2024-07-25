import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div>
      <div className="herobg">
        <div class="container">
          <div class="col-md-12">
            <h1 className="agent">
              Buy. Rent. <br />
              Lease. Homes.
            </h1> <br/>
            <button type="button" className="btn btn-outline-light">Explore Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
