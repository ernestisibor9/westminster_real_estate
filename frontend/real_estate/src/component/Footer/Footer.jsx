import React from "react";
import { FaHome, FaPhoneAlt, FaPrint, FaFacebook, FaTwitter, FaWhatsappSquare, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer
        class=" text-center text-lg-start mt-5"
        style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
      >
        <div class="container p-4 mt-5">
          <div class="row">
            <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 class="text-uppercase text-white">WebMinster Real Estate</h5>
              <p className="text-white">
                Our team of experienced real estate professionals is dedicated
                to delivering exceptional results. Whether you are buying,
                selling, or renting, we are here to guide you every step of the
                way.
              </p>
              <div className="d-flex">
                <Link to = '' className="text-white fa"><FaFacebook /></Link>
                <Link to = '' className="text-white fa"><FaTwitter /></Link>
                <Link to = '' className="text-white fa"><FaWhatsappSquare /></Link>
                <Link to = '' className="text-white fa"><FaInstagramSquare /></Link>
                <Link to = '' className="text-white fa"><FaYoutube /></Link>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase text-white">Real Estate</h5>

              <ul class="list-unstyled mb-0">
                <li>
                  <a href="#!" class="text-white my-list">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-white my-list">
                    About
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-white my-list">
                    Service
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-white my-list">
                    Properties
                  </a>
                </li>
              </ul>
            </div>

            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-0 text-white">Contact</h5>

              <ul class="list-unstyled">
                <li>
                  <a href="#!" class="text-white my-list">
                    <FaHome /> &nbsp; London, UK
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-white my-list">
                    <IoMdMail /> &nbsp; info@realestate.com
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-white my-list">
                    <FaPhoneAlt /> &nbsp; +44 2638 097
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-white my-list">
                    <FaPrint /> &nbsp; + 01 234 567 89
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="text-center text-white p-3"
          style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
        >
          Copyright © 2024, All rights reserved
          <a class="text-white text-white" href="https://yourcompany.com/"></a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
