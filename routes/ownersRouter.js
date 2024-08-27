// Import required modules
const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

// POST route to create a new owner
router.post("/create", async function(req, res){
    // Check if any owners already exist
    let owners = await ownerModel.find();
    if (owners.length > 0){
        return res.status(504).send("you dont have permission to create a new owner");
    }
    
    // Extract data from request body
    let {fullname, email, password} = req.body;
    
    // Create a new owner
    let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
    });
    
    // Send the created owner as response
    res.status(201).send(createdOwner);
});

router.get("/admin", function(req, res){
    res.render('createproduct');
})

module.exports = router;