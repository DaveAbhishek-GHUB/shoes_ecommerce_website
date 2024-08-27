// Import Express and create a router
const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");    

// Define the root route
router.get("/", function(req, res){
    res.render('index');
});

router.get("/shop", async function(req, res){
    let products = await productModel.find();
    res.render('shop', {products});
})

// Export the router
module.exports = router;