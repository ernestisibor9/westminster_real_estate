import React from "react";
// import Navbar from "../../component/Navbar/Navbar";
import "./About.css";
import { assets } from "../../assets/asset";

function About() {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="dashboard-bg">
        <div className="dashboard-head">
          <h1>About Us</h1>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <img src={assets.team} alt="" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h3>Who We Are</h3>
            <p>
              At WebMinster Real Estate, we believe that finding the perfect
              home or investment property is not just a transaction but a
              journey. Established in 2020, we have been dedicated to providing
              exceptional real estate services tailored to meet the unique needs
              of each client. Our passion for real estate, combined with our
              commitment to excellence, has made us a trusted name in the
              industry.
            </p>
            <h3>Our Mission</h3>
            <p>
              Our mission is to transform the real estate experience through
              innovation, integrity, and personalized service. 
            </p>
            <h3>Our Vision</h3>
            <p>
              Our vision is to become the leader in the real estate industry by
              providing exceptional services, expertise, and a personal touch.
            </p>
          </div>
        </div>
      </div>

      <div class="container team-section mt-5">
    <div class="row">
        <div class="col-md-12 text-center">
            <h2>Meet Our Team</h2>
            <p class="text-muted mb-5">Our dedicated team of professionals is here to help you.</p>
        </div>
        <div class="col-md-4 team-member">
            <img src={assets.smallavatar5} alt="Team Member 1"/>
            <h5>John Doe</h5>
            <p>CEO & Founder</p>
            <div class="social-icons">
                <a href="#!" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#!" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="#!" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            </div>
        </div>
        <div class="col-md-4 team-member">
            <img src={assets.smallavatar4} alt="Team Member 2"/>
            <h5>Jane Smith</h5>
            <p>Lead Real Estate Agent</p>
            <div class="social-icons">
                <a href="#!" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#!" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="#!" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            </div>
        </div>
        <div class="col-md-4 team-member">
            <img src={assets.smallavatar6} alt="Team Member 3"/>
            <h5>Michael Brown</h5>
            <p>Marketing Director</p>
            <div class="social-icons">
                <a href="#!" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#!" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="#!" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            </div>
        </div>
    </div>
</div>
    </div>
  );
}

export default About;
