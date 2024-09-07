import React from "react";
import "./Hero2.css";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

function Hero2() {
  return (
    <div>
      <div className="herobg mt-5">
        <div class="container">
          <div class="col-md-12">
            <h1 className="agent">
              Do you have a <br />
              Property to sell? <br />
            </h1>{" "}
            <br />
            <Link to = '/contact' type="button" class="btn btn-outline-light">Contact Us Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero2;
