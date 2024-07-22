const express = require('express');
const { getAllProperties, createProperty, countProperty, availableProperties, featuredProperties, countAvailableProperties, updateProperty, deleteProperty } = require('../controller/propertyController');
const authMiddleware = require('../middleware/authMiddleware');
const route = express.Router();
const multer  = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/')
      // ../frontend/book/src/images/
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

// All the routes for properties
route.get('/get-all-properties', getAllProperties)
route.get('/count-all-properties', countProperty)
route.get('/get-single-property/:id', getAllProperties)
route.put('/update-property/:id', authMiddleware, updateProperty)
route.put('/delete-property/:id', authMiddleware, deleteProperty)
route.get('/available-properties', availableProperties)
route.get('/featured-properties', featuredProperties)
route.get('/count-available-properties', countAvailableProperties)
route.post('/create-properties', authMiddleware, upload.single('image'), createProperty)


module.exports = route;