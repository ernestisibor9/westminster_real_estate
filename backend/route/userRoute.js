const express = require('express');
const { registerUser, loginUser, getLoggedInUser, getAllUsers, forgottenUserPassword, resetUserPassword, totalUsers, emailConfirmation } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const route = express.Router();

// All the routes for users
route.post('/register', registerUser)
route.get('/confirm/:confirmationCode', emailConfirmation)
route.post('/login', loginUser)
route.post('/forgotten-password', forgottenUserPassword)
route.post('/reset-password/:id/:token', resetUserPassword)
route.get('/getloggedinuser', authMiddleware, getLoggedInUser)
route.get('/allusers', getAllUsers)
route.get('/total-users', totalUsers)


module.exports = route;