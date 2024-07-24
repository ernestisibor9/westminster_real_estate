const mongoose = require("mongoose");

// Create schema
const propertySchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // image: {
    //   type: String,
    // },
    image: [String],
    location: {
        type: String,
        required: true,
      },
    propertyTypes: {
        type: String,
        required: true,
    },
    propertyFor: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create model
const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
