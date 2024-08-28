// Import Express and create a router
const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");  
const isLoggedin = require("../middlewares/isLoggenin");

// Define the root route
router.get("/", function(req, res){
    res.render('index');
});

// Define a route for the '/shop' path
router.get("/shop", async function(req, res){
    // Fetch all products from the database
    let products = await productModel.find();
    // Render the 'shop' view, passing the products data
    res.render('shop', {products});
});

// Route to display product details
router.get("/productdetail/:productid", async function (req, res) {
    try {
        // Find the product by ID
        const product = await productModel.findById(req.params.productid);
        if (!product) {
            // If product not found, return 404 error
            return res.status(404).send('Product not found');
        }
        // Render the product detail page with the product data
        res.render('productdetail', { product: product });
    } catch (error) {
        // Log and handle any server errors
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Route to display user's cart (requires authentication)
router.get("/cart", isLoggedin, async function(req, res){
    // Find the user and populate their cart with product details
    let user = await userModel.findOne({email: req.user.email}).populate("cart");
    // Render the cart page with user data
    res.render("cart", {user});
});

// Route to add a product to the cart (requires authentication)
router.post("/addtocart/:productid", isLoggedin, async function(req, res){
    try {
        // Find the user
        let user = await userModel.findOne({email: req.user.email});
        // Add the product ID to the user's cart
        user.cart.push(req.params.productid);
        // Save the updated user document
        await user.save();
        // Send a success response
        res.json({ success: true, message: "Product added to cart" });
    } catch (error) {
        // Log and handle any errors
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding product to cart" });    
    }
});

// Route to remove a product from the cart (requires authentication)
router.post("/removefromcart/:productid", isLoggedin, async function(req, res){
    try {
        // Find the user
        let user = await userModel.findOne({email: req.user.email});
        // Remove the product ID from the user's cart
        user.cart = user.cart.filter(id => id.toString() !== req.params.productid);
        // Save the updated user document
        await user.save();
        // Send a success response
        res.json({ success: true, message: "Product removed from cart" });
    } catch (error) {
        // Log and handle any errors
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing product from cart" });
    }
});
// Export the router
module.exports = router;