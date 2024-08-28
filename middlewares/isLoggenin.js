// Import required modules
const jwt = require("jsonwebtoken");
const userModel = require("../models//user-model");
const alert = require("alert-node");

// Export middleware function
module.exports = async function (req, res, next) {
  // Check if token exists in cookies
  if (!req.cookies.token) {
    // If no token, redirect to home page
    return res.redirect("/");
  }

  try {
    // Verify the token using the JWT_KEY
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    
    // Find the user in the database using the email from the decoded token
    // Exclude the password field from the returned user object
    let user = await userModel.findOne({ email: decoded.email }).select("-password");

    // Attach the user object to the request
    req.user = user;
    
    // Move to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails or user not found
    // Show an alert
    alert("you need to login first");
    // Redirect to home page
    res.redirect("/");
  }
};