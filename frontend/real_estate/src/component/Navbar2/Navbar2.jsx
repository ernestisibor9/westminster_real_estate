import React from 'react'
import { Link } from 'react-router-dom';
import "./Navbar2.css"



function Navbar2() {
  return (
    <div>
      <nav class="navbar navbar-expand-md bg-white p-0">
        <div class="container-fluid">
            <Link to='/' class="navbar-brand fw-bold" href="#">
                Real<span class="text-danger">Estate</span>
            </Link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <i class="fa-solid fa-bars-staggered text-danger"></i>
            </button>

            <div class="collapse navbar-collapse p-0" id="navbarSupportedContent">
                <ul class="navbar-nav w-100 fs-8 p-0">
                    <li class="nav-item p-0">
                        <Link to='' class="nav-link m-2 " href="#">HOME</Link>
                    </li>
                    <li class="nav-item p-0">
                        <Link to = '' class="nav-link m-2" href="about.html">ABOUT</Link>
                    </li>

                    <li class="nav-item p-0">
                        <Link to ='' class="nav-link m-2 active" aria-current="page" href="contacts.html">CONTACT</Link>
                    </li>


                </ul>
                <div class=" fs-9 fw-bold text-center">
                    <i class="fa-solid fa-user border rounded-circle p-1"></i>
                    login
                </div>

            </div>
        </div>
    </nav>
    </div>
  )
}

export default Navbar2
