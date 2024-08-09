import React from "react";
import {
  FaHome,
  FaPhoneAlt,
  FaPrint,
  FaFacebook,
  FaTwitter,
  FaWhatsappSquare,
  FaInstagramSquare,
  FaYoutube,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer
        class=" text-center text-lg-start"
        style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
      >
        <div class="container p-4 mt-5">
          <div class="row">
            <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h6 class="text-uppercase text-white">WebMinster Real Estate</h6>
              <small className="text-white">
                Our team of experienced real estate professionals is dedicated
                to delivering exceptional results. Whether you are buying,
                selling, or renting, we are here to guide you every step of the
                way.
              </small>
              <hr className="mb-3" style={{ color: "white" }} />
              <div className="d-flex">
                <Link to="" className="text-white fa">
                  <FaFacebook />
                </Link>
                <Link to="" className="text-white fa">
                  <FaTwitter />
                </Link>
                <Link to="" className="text-white fa">
                  <FaWhatsappSquare />
                </Link>
                <Link to="" className="text-white fa">
                  <FaInstagramSquare />
                </Link>
                <Link to="" className="text-white fa">
                  <FaYoutube />
                </Link>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h6 class="text-uppercase text-white">Real Estate</h6>

              <ul class="list-unstyled mb-0">
                <li>
                  <Link to = '/' class="text-white my-list">
                    <p style={{ fontSize: "14px" }}>Home</p>
                  </Link>
                </li>
                <li>
                  <Link to='/about' class="text-white my-list">
                    <p style={{ fontSize: "14px" }}>About</p>
                  </Link>
                </li>
                <li>
                  <Link to = '/services' class="text-white my-list">
                    <p style={{ fontSize: "14px" }}>Services</p>
                  </Link>
                </li>
                <li>
                  <Link to ='/list-property' class="text-white my-list">
                    <p style={{ fontSize: "14px" }}>Properties</p>
                  </Link>
                </li>
              </ul>
            </div>

            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h6 class="text-uppercase mb-0 text-white">Contact</h6>

              <ul class="list-unstyled">
                <li>
                  <a href="#!" class="text-white my-list">
                    <FaHome /> &nbsp;{" "}
                    <span style={{ fontSize: "14px" }}>London, UK</span>
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-white my-list">
                    <IoMdMail /> &nbsp;{" "}
                    <span style={{ fontSize: "14px" }}>
                      info@realestate.com
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-white my-list">
                    <FaPhoneAlt /> &nbsp;{" "}
                    <span style={{ fontSize: "14px" }}>+44 9340 2729 01</span>
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-white my-list">
                    <FaPrint /> &nbsp;{" "}
                    <span style={{ fontSize: "14px" }}>+ 01 2342 8567 89 </span>
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
          <span style={{ fontSize: "14px" }}>
            Copyright © 2024. All rights reserved
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
