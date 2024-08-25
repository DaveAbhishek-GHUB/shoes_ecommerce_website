// Import the mongoose module
const mongoose = require('mongoose');

// Define the schema for the product
const productSchema = mongoose.Schema({
    image: Buffer, // Store image as binary data
    name: String,  // Product name as a string
    price: Number, // Price as a number
    discount: {
        type: Number,
        default: 0, // Set default discount to 0
    },
    bgcolor: String,    // Background color as a string
    panelcolor: String, // Panel color as a string
    textcolor: String,  // Text color as a string
});

// Create and export a mongoose model named 'product' using the productSchema
module.exports = mongoose.model('product', productSchema);