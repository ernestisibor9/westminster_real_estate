const mongoose = require('mongoose');

// Create schema - userSchema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'user'
    },
    isConfirmed:{
        type: Boolean,
        default: 'false'
    },
    confirmationCode:{
        type: String,
        unique: true,
    },
},
{
    timestamps: true
}
);

// Create model
const User = mongoose.model('User', userSchema);
module.exports = User;



