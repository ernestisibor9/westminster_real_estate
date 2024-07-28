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
route.get("/count-all-properties", countProperty);
route.get("/get-single-property/:id", getSingleProperty);
route.get("/get-one-property/:id", getOneProperty);
route.put("/update-property/:id", authMiddleware, updateProperty);
route.delete("/delete-property/:id", authMiddleware, deleteProperty);
route.get("/available-properties", availableProperties);
route.get("/featured-properties", featuredProperties);
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
