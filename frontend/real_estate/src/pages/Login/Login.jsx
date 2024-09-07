import React, { useState } from 'react'
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

function Login() {

  const users = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(users);

  // Function to get whatsover the user type
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const navigation = useNavigate()

    // handleSubmit - to connect the backend to the frontend
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (
        user.email === "" ||
        user.password === "" 
      ) {
          toast.error("Fields cannot be empty");
        return;
      } else {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/user/login",
            user
          );
          // console.log(response);
          if (response.data.success) {
            toast.success(response.data.message);
            localStorage.setItem("user", JSON.stringify(response.data.token));
            navigation('/dashboard');
          } else {
            toast.error(response.data.message);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

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


  return (
    <div className="login-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow card-form p-3">
            <h3 className="text-center">Login</h3>
              <div className="card-body">
                <form  onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={inputChangeHandler}
                      id=""
                      placeholder="email"
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
                    <FaEye className="eye" id="fa-eye" />
                    <FaEyeSlash className="eye" id="fa-eye-slash" />
                  </div>
                  <div class="d-grid gap-2">
                    <button class="btn btn-primary" type="submit">
                      Login
                    </button>
                  </div>
                  <div className="d-flex justify-content-between link-bottom">
                    <Link to="/" href="" className="home mt-3 fw-bold">
                      Home
                    </Link>
                    <Link to="/register" href="" className="home mt-3 fw-bold">
                      Register
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
