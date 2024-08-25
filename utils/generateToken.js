// Import the jsonwebtoken library
const jwt = require("jsonwebtoken");

// Define a function to generate a JWT token
const generateToken = (user) => {
    // Create and return a signed JWT
    return jwt.sign(
        // Payload: user's email and id
        { email: user.email, id: user._id },
        // Secret key from environment variables
        process.env.JWT_KEY
    );
}

// Export the generateToken function
module.exports.generateToken = generateToken;