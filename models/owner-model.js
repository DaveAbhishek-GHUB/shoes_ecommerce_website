// Import Mongoose
const mongoose = require('mongoose');

// Define the schema for the owner
const ownerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
});

// Create and export the model
module.exports = mongoose.model('owner', ownerSchema);