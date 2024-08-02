const express = require('express');
const { createOwnerProperty } = require('../controller/ownerPropertyController');
const route = express.Router();

// All the routes for users
route.post('/owner-property', createOwnerProperty)


module.exports = route;