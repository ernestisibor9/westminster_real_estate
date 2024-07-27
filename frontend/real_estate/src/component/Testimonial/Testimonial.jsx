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
          <div class="col-md-4">
            <div class="testimonial">
              <img src={assets.smallavatar1} alt="Client 1" />
              <h6>Emily Johnson</h6>
              <p>
                "Finding my dream home was a breeze with [Your Company Name].
                Highly recommended!"
              </p>
              <div class="stars text-warning">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="testimonial">
              <img src={assets.smallavatar2} alt="Client 2" />
              <h6>Michael Smith</h6>
              <p>
                "Professional, efficient, and friendly service. I couldn't be
                happier with my new home!"
              </p>
              <div class="stars text-warning">&#9733;&#9733;&#9733;&#9733;&#9734;</div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="testimonial">
              <img src={assets.smallavatar3} alt="Client 3" />
              <h6>Dennis Williams</h6>
              <p>
                "Great experience from start to finish. [Your Company Name] made
                the process seamless."
              </p>
              <div class="stars text-warning">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
