const express = require('express');
const Property = require('../model/Property');
const User = require('../model/User');


// Create property
const createProperty = async (req, res) => {
    try{

        const {admin, title, description, price, image, location, propertyTypes, propertyFor} = req.body
        // const user = await User.findById(req.body.userId );
        // console.log(user);
        // if (!title || !description || !price || !location || !image) {
        //     return res.status(400).json({ message: 'All fields are required' });
        // }
        // Image upload
        // const imageName = req.file.filename
        const files = req.files;
        const urls = files.map(file => `${file.filename}`);
        // ../frontend/real_estate/src/images/

		const newProperty = await Property.create(
            {
                admin: admin,
                title: title,
                description: description,
                price: price,
                image: urls,
                location: location,
                propertyTypes: propertyTypes,
                propertyFor: propertyFor,  // Assuming propertyType and propertyFor are passed in request body
               // Assuming userId is passed in request body
            }
        );
		return res.status(201).json({
            success: true,
            message: "Property created successfully",
            property: newProperty,
        })
	}
	catch(error){
        res.status(500).json({ message: error.message });
	}
};

// List all properties
const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate('admin', '-password');;
        res.json(properties);
    console.log(properties[0].admin.name);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View single property
const getSingleProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('admin', '-password');
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View individual property
const getOneProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Count Property
const countProperty = async (req, res) => {
    try {
        const propertyCount = await Property.countDocuments();
        res.json({ success: true, message: `Total properties: ${propertyCount}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Count Available Properties
 const countAvailableProperties = async (req, res) => {
    try {
        const availablePropertiesCount = await Property.countDocuments({isAvailable: true});
        res.json({ success: true, message: `Total available properties: ${availablePropertiesCount}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Available Properties
const availableProperties = async (req, res) => {
    try {
        const availableProperties = await Property.find({isAvailable: true}).populate('admin', '-password');
        if(!availableProperties) {
            return res.status(404).json({ message: 'No available properties found' });
        }
        res.json(availableProperties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Featured properties
const featuredProperties = async (req, res) => {
    try {
        const featuredProperties = await Property.find({featured: true}).populate('admin', '-password');
        if(!featuredProperties) {
            return res.status(404).json({ message: 'No featured properties found' });
        }
        res.json(featuredProperties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update property
const updateProperty = async (req, res) => {
    try {
        const findProperty = await Property.findById(req.params.id);
        if(!findProperty){
            return res.status(403).json({ message: 'Invalid Property id' });
        }
        console.log(findProperty.admin.toString());
        if(findProperty.admin.toString() !== req.body.userId.toString()){
            throw new Error ("You are not allowed to update other people's properties")
        }
        else{
            const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            property: property,
          });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete property
const deleteProperty = async (req, res) => {
    try {
        const findProperty = await Property.findById(req.params.id);
        if(!findProperty){
            return res.status(403).json({ message: 'Invalid Property id' });
        }
        if(findProperty.admin.toString()!== req.body.userId.toString()){
            throw new Error ("You are not allowed to delete other people's properties")
        }
        else{
            await Property.findByIdAndDelete(req.params.id);
            res.status(200).json({
                success: true,
                message: "Property deleted successfully",
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Featured
const featuredStatus = async (req, res) => {
    try {
        const item = await Property.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Toggle status between 'active' and 'pending'
        item.featured = item.featured === 'featured' ? 'featured' : 'non-featured';
        await item.save();

        res.json({ featured: item.featured });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {getAllProperties, createProperty, featuredStatus,  getOneProperty, getSingleProperty, countProperty, availableProperties, featuredProperties, countAvailableProperties, updateProperty, deleteProperty }