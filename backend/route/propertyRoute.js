const express = require("express");
const {
  getAllProperties,
  createProperty,
  countProperty,
  availableProperties,
  featuredProperties,
  countAvailableProperties,
  updateProperty,
  deleteProperty,
  getOneProperty,
  getSingleProperty,
  featuredStatus,
  updateMultipleImages,
  existingProperties,
  propertiesFor,
  propertyTypes,
  allLocation,
  fetchSearchProperties,
  getPropertiesByBuy,
  getPropertyLocationBuy,
  getPropertyLocationRent,
  getPropertyLocationLease,
  updatePropertyStatus,
  getAllHomeProperties,
  countAllProperties,
  countActiveProperty,
  countPendingProperty,
} = require("../controller/propertyController");
const authMiddleware = require("../middleware/authMiddleware");
const route = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/real_estate/src/images/");
    // ../frontend/book/src/images/
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// All the routes for properties
route.get("/get-all-properties", getAllProperties);
route.get("/get-property-buy", getPropertiesByBuy)
route.get("/get-property-rent", getPropertyLocationRent)
route.get("/get-property-lease", getPropertyLocationLease)
route.get('/get-all-properties-home', getAllHomeProperties)
route.post("/get-property-location-buy", getPropertyLocationBuy)
route.post('/fetch-buy-property', fetchSearchProperties)
route.get("/count-all-properties", countProperty);
route.get("/get-single-property/:id", getSingleProperty);
route.get("/get-one-property/:id", getOneProperty);
route.get("/all-location", allLocation);
route.put('/update-property-status/:id', updatePropertyStatus);
route.put("/update-property/:id", authMiddleware, updateProperty);
route.delete("/delete-property/:id", authMiddleware, deleteProperty);
route.get("/available-properties", availableProperties);
route.get("/featured-properties", featuredProperties);
route.get('/count-all-properties', countAllProperties);
route.get('/count-active-properties', countActiveProperty);
route.get('/count-pending-properties', countPendingProperty); 
route.put("/featured-property/status/:id", featuredStatus);
route.get("/count-available-properties", countAvailableProperties);
route.post("/search-for", propertiesFor);
route.post("/search-types", propertyTypes);
route.post("/search-by-location", existingProperties);
route.put(
  "/update-multiple-images/:id",
  authMiddleware,
  upload.array("image", 10),
  updateMultipleImages
);
route.post(
  "/create-properties",
  authMiddleware,
  upload.array("image", 10),
  createProperty
);
// route.post('/create-properties', authMiddleware, upload.single('image'), createProperty)

module.exports = route;
