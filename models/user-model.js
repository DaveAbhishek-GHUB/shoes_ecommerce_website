// Import the mongoose module
const mongoose = require('mongoose');

// Define the schema for the user
const userSchema = new mongoose.Schema({
    fullname: String,  // User's full name as a string
    email: String,     // User's email address as a string
    password: String,  // User's password as a string (should be hashed in practice)
    cart: [{
        type: mongoose.Schema.Types.ObjectId,  // Array of ObjectIds
        ref: "product",  // References the 'product' model
    }],
    orders: {
        type: Array,   // Array to store order information
        default: []    // Default value is an empty array
    },
});

// Create and export a mongoose model named 'user' using the userSchema
module.exports = mongoose.model('user', userSchema);