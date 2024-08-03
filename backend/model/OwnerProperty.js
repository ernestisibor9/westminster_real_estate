const mongoose = require('mongoose');

// Create schema - ownerPropertySchema
const ownerPropertySchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    propertyTypes: {
        type: String,
        required: true,
    },
    transaction: {
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    }
},
{
    timestamps: true
}
);

// Create model
const OwnerProperty= mongoose.model('OwnerProperty', ownerPropertySchema);
module.exports = OwnerProperty;



