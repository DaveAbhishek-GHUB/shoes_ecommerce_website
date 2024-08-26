// Import the express module
const express = require('express');

// Create a router object
const router = express.Router();

// Import specific functions from the authController
const {registerUser, loginUser, logout} = require("../controllers/authController");

// Define a route for the root path '/'
router.get("/", function(req, res){
    res.send("Heyy its working..."); // Send a simple text response
});

// Define a route for the '/register' path (GET request)
router.get("/register", function(req, res){
    res.render("signup") // Render the 'signup' view
});

// Define a route for the '/register' path (POST request)
// Use the registerUser function from authController to handle the registration
router.post("/register", registerUser);

router.get("/login", function(req, res){
    res.render("login") // Render the 'signup' view
});
router.post("/login", loginUser);

// Export the router to be used in other parts of the application
module.exports = router;