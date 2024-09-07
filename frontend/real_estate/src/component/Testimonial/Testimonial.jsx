import React from "react";
import { assets } from "../../assets/asset";

function Testimonial() {
  return (
    <div className="mt-5 mb-5">
      <div class="container testimonial-section">
        <div class="row">
          <div class="col-md-12 text-center">
            <h3>What Our Clients Say</h3>
            <p class="text-muted mb-5">
              Our clients love us! Read what they have to say below.
            </p>
          </div>
          <div className="col-md-4">
            <div className="card shadow hover-image">
              <div className="card-body">
                <img src={assets.test1} alt="" className="img-fluid"/>
                <div className="text-center">
                <h6 className="mt-2 fw-bold">Adesuwa Osaze</h6>
                <small>
                "Finding my dream home was a breeze with PropertyPaddy.
                Highly recommended!"
                </small>
                <div class="stars text-warning">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow hover-image">
              <div className="card-body">
                <img src={assets.test2} alt="" className="img-fluid"/>
                <div className="text-center">
                <h6 className="mt-2 fw-bold">Chioma Johnson</h6>
                <small>
                "Professional, efficient, and friendly service. I couldn't be
                happier with my new home!"
                </small>
                <div class="stars text-warning">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow hover-image">
              <div className="card-body">
                <img src={assets.test3} alt="" className="img-fluid"/>
                <div className="text-center">
                <h6 className="mt-2 fw-bold">Michael Ojo</h6>
                <small>
                "Great experience from start to finish. PropertyPaddy made
                the process seamless."
                </small>
                <div class="stars text-warning">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
