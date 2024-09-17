const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Nodemailer (Mailtrap.io configuration for mail sending)
var transporter = nodemailer.createTransport({
  service: "smtp",
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false, // true for 465, false for other ports
  // service: 'gmail',
  auth: {
    user: "8e61a470a5f69f",
    pass: "1f20e52f5e17c3",
  },
});

// Sending email using Nodemailer
const sendConfirmationEmail = (userEmail, userName, confirmationCode) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: userEmail,
    subject: "Please confirm your email address",
    html: `<h1>Email Confirmation</h1>
               <h2>Hello ${userName}</h2>
               <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
               <a href="https://westminster-real-estate-backend.onrender.com/api/user/confirm/${confirmationCode}"> Click here</a>`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.error(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Register a user
const registerUser = async (req, res) => {
  console.log("Request body:", req.body); // Log the request body
  const { name, email, password, phone } = req.body;
  try {
    const findIfUserExist = await User.findOne({ email: email });
    if (findIfUserExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const confirmationCode = crypto.randomBytes(16).toString("hex");

    const addUser = new User({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
      confirmationCode: confirmationCode,
    });

    await addUser.save();
    res.status(201).json({
      success: true,
      message: "User registered. Please check your email for confirmation.",
      addUser: addUser,
    });

    sendConfirmationEmail(addUser.email, addUser.name, addUser.confirmationCode);
  } catch (err) {
    console.error("Error in registration:", err); // Log the error
    res.status(500).json({ message: err.message });
  }
};


// Route to handle email confirmation
const emailConfirmation = async (req, res) => {
  const { confirmationCode } = req.params;
  console.log("Received confirmation code:", confirmationCode); // Debugging
  
  try {
    const user = await User.findOne({ confirmationCode });
    if (!user) {
      console.log("Invalid confirmation code"); // Log if code is invalid
      return res.status(400).json({ message: "Invalid confirmation code" });
    }
    
    user.isConfirmed = true;
    // user.confirmationCode = ''; // Clear the confirmation code
    await user.save();
    
    res.redirect("https://westminster-real-estate-frontend.onrender.com/login");
  } catch (err) {
    console.error("Error during email confirmation:", err); // Log the error
    res.status(500).send("Server error: " + err.message);
  }
};


// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const PersonExist = await User.findOne({ email: email });
    if (!PersonExist) {
      return res.json({ message: "User does not exist" });
    }
    // Check if the password matches
    const isMatch = await bcrypt.compare(password, PersonExist.password);
    if (!isMatch) {
      return res.json({ message: "Password is incorrect" });
    }
    // Check if the user has confirmed their email
    if (!PersonExist.isConfirmed) {
      return res.json({ message: "Please confirm your email to log in" });
    }
    // Generate the token
    const token = jwt.sign(
      { userId: PersonExist._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({
      success: true,
      message: "Person logged in successfully",
      person: PersonExist,
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
};

// Get logged in user's details
const getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      throw new Error("User not found");
    }
    // if(user.name !== "Adedeji222"){
    //   throw new Error("This is not you");
    // }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: user,
    });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Forgotten Password
const forgottenUserPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const PersonExist = await User.findOne({ email: email });
    if (!PersonExist) {
      return res.json({ message: "User does not exist" });
    }

    // Generate the token
    const token = jwt.sign(
      { userId: PersonExist._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    // Nodemailer
    var transporter = nodemailer.createTransport({
       service: "smtp",
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
      secure: false, // true for 465, false for other ports
      // service: 'gmail',
       auth: {
    user: "8e61a470a5f69f",
    pass: "1f20e52f5e17c3",
  },
    });

    var mailOptions = {
      from: "ernestisibor9@gmail.com",
      to: `${PersonExist.email}`,
      subject: "Reset Your Password",
      text: `https://westminster-real-estate-frontend.onrender.com/reset-password/${PersonExist._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({
          success: true,
        });
      }
    });

    res.status(200).json({
      success: true,
      message: "Email reset successfully",
      person: PersonExist,
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
};

const resetUserPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decoded) {
    return res.json({
      success: false,
      message: "Token is invalid",
    });
  } else {
    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.findByIdAndUpdate(
      { _id: id },
      { password: hashedPassword }
    );
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      user: user,
    });
  }
};

// Count documents
const totalUsers = async (req, res) => {
  const userCount = await User.countDocuments();

  if (!userCount) {
    return res.json({
      success: false,
      message: "No users found",
    });
  }
  res.status(200).json({
    success: true,
    message:  userCount,
  });
};

module.exports = {
  registerUser,
  emailConfirmation,
  loginUser,
  getLoggedInUser,
  getAllUsers,
  forgottenUserPassword,
  resetUserPassword,
  totalUsers,
};
