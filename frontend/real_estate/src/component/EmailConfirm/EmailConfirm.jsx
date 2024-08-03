import React from "react";
import { Link } from "react-router-dom";
import "./EmailConfirm.css";

function EmailConfirm() {
  return (
    <div>
      <div className="dashboard-bg">
        <div className="dashboard-head">
          <h1>Email Confirmation</h1>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h3 className="text-center">Email confirmed</h3>
            <h4>Your email has been confirmed!</h4>
            <p>You can now log in to your account.</p>
            <Link to="/login" className="link-log">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailConfirm;
