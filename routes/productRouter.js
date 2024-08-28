const express = require('express');
const router = express.Router();
// Import the multer configuration
const upload = require('../config/multer-config');
// Import alert-node for showing alerts
const alert = require('alert-node');

// Import the product model
const productModel = require("../models/product-model");

// Define a route for creating a product
router.post("/create", upload.single("image"), async function (req, res) {
    try{
        // Extract product details from request body
        let {name, price, discount, bgcolor, panelcolor, textcolor} = req.body;
        // Create a new product in the database
        let product = await productModel.create({
            image: req.file.buffer, // Store the uploaded image as a buffer
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });
        // Show an alert for successful product insertion
        alert("product inserted successfully");
        // Redirect to the admin page
        res.redirect('/owners/admin');
    }catch(err){
        // If an error occurs, send the error message
        res.send(err.message);
    }
});

// Export the router
module.exports = router;