// Import Express and create a router
const express = require("express");
const router = express.Router();

// Define the root route
router.get("/", function(req, res){
    res.send("Heyy its working")
});

// Export the router
module.exports = router;