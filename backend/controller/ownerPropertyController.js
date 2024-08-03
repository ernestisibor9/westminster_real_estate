const express = require("express");
const OwnerProperty = require("../model/OwnerProperty");

// Create Owner property
const createOwnerProperty = async (req, res) => {
  try {
    const {
      ownerName,
      email,
      phone,
      transaction,
      description,
      price,
      location,
      propertyTypes,
    } = req.body;

    if (
      !ownerName ||
      !email ||
      !phone ||
      !transaction ||
      !description ||
      !price ||
      !location
    ) {
      return res.status(400).json({ message: "Fields cannot be empty!" });
    }

    const newProperty = await OwnerProperty.create({
      ownerName,
      email,
      phone,
      transaction,
      description,
      price,
      location,
      propertyTypes,
    });
    return res.status(201).json({
      success: true,
      message:
        "Owner Property successfully submitted. We will get back to you soon",
      property: newProperty,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOwnerProperty,
};
