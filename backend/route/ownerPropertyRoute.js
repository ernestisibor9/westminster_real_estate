const express = require('express');
const { createOwnerProperty } = require('../controller/ownerPropertyController');
const route = express.Router();

// Owner Property routes
route.post('/owner-property', createOwnerProperty)


module.exports = route;