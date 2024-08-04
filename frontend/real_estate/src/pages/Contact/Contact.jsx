import React from 'react'
import Navbar from '../../component/Navbar/Navbar'
import { FaHome, FaPhoneAlt, FaPrint, FaFacebook, FaTwitter, FaWhatsappSquare, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import "./Contact.css"

function Contact() {
  return (
    <div>
      <div className="dashboard-bg">
        <div className="dashboard-head">
          <h1>Contact</h1>
        </div>
      </div>
      <div className='container mt-5'>
        <div className='row justify-content-center'>
            <div className='col-md-12'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d29035666.109867685!2d-18.000076611267733!3d27.332184569212213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d6.5994752!2d3.3488895999999997!4m5!1s0x48761ad51b1e1cf9%3A0xcc7544a8c326ab06!2suniversity%20of%20westminster!3m2!1d51.516984099999995!2d-0.143179!5e0!3m2!1sen!2sng!4v1722076949671!5m2!1sen!2sng" height={400} width='100%' style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
        <div className='row justify-content-center mb-5 gy-4'>
            <h3 className='text-center mt-5 mb-5'>CONTACT US</h3>
            <div className='col-md-4 hover-image'>
            <div className='card shadow p-3'>
                <div className='card-body'>
                    <div className='text-center'>
                        <FaHome size={34} className='mr-2 fab' />
                        <h6>Address</h6>
                        <small>309 Regent Street London W1B</small>
                    </div>
                </div>
            </div>
            </div>
            <div className='col-md-4 hover-image'>
            <div className='card shadow p-3'>
                <div className='card-body'>
                    <div className='text-center'>
                        <FaPhoneAlt size={34} className='mr-2 fab' />
                        <h6>Phone</h6>
                        <small>+44 9948 0921</small>
                    </div>
                </div>
            </div>
            </div>
            <div className='col-md-4 hover-image'>
            <div className='card shadow p-3'>
                <div className='card-body'>
                    <div className='text-center'>
                        <IoMdMail size={34} className='mr-2 ' />
                        <h6>Email</h6>
                        <small>info@realestate.com</small>
                    </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
