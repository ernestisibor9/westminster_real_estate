import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

function Register() {
  // Selecting the password id, eye-open and ey-close icons
  const myPass = document.getElementById("pass");
  const myIconEyeOpen = document.getElementById("fa-eye");
  const myIconEyeClose = document.getElementById("fa-eye-slash");

  // Add an event listener to the icons
  if(myIconEyeOpen){
    myIconEyeOpen.addEventListener("click", function () {
      myPass.type = "password";
      myIconEyeOpen.style.display = "none";
      myIconEyeClose.style.display = "block";
    });
  }

  if(myIconEyeClose){
    myIconEyeClose.addEventListener("click", function () {
      myPass.type = "text";
      myIconEyeClose.style.display = "none";
      myIconEyeOpen.style.display = "block";
    });
  }

  const users = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };
  const [user, setUser] = useState(users);
  // Function to get whatsover the user type
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  // Navigate
  const navigate = useNavigate();
  // handleSubmit - to connect the backend to the frontend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      user.name === "" ||
      user.email === "" ||
      user.password === "" ||
      user.phone === ""
    ) {
      toast.error("Fields cannot be empty");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/register",
          user
        );
        console.log(response);
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="register-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow card-form p-3">
              <h3 className="text-center">Register</h3>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={inputChangeHandler}
                      id=""
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={inputChangeHandler}
                      id=""
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={inputChangeHandler}
                      id="pass"
                      placeholder="Password"
                    />
                    <FaEye className="eyereg" id="fa-eye" />
                    <FaEyeSlash className="eyereg" id="fa-eye-slash" />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      onChange={inputChangeHandler}
                      id=""
                      placeholder="Phone"
                    />
                  </div>
                  <div class="d-grid gap-2">
                    <button class="btn btn-primary" type="submit">
                      SignUp
                    </button>
                  </div>
                  <div className="d-flex justify-content-between link-bottom">
                    <Link to="/" href="" className="home mt-3 fw-bold">
                      Home
                    </Link>
                    <Link to="/login" href="" className="home mt-3 fw-bold">
                      Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
