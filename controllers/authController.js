// Import required modules and models
const userModel = require('../models/user-model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require('../utils/generateToken');

// Export the registerUser function
module.exports.registerUser = async function (req, res) {
    try {
        // Extract user details from request body
        let { fullname, email, password } = req.body;

        // Check if user already exists
        let user = await userModel.findOne({ email: email });

        if (user) {
            // If user exists, return error message
            return res.status(401).send("you already have an account please login");
        }

        // Generate salt for password hashing
        bcrypt.genSalt(10, function (err, salt) {
            // Hash the password
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    // If hashing fails, send error message
                    return res.send(err.message);
                } else {
                    // Create new user with hashed password
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash,
                    });

                    // Generate token for the new user
                    let token = generateToken(user);
                    
                    // Set token in cookie
                    res.cookie("token", token);
                    
                    // Send success message
                    res.send("user created successfully");
                }
            });
        });
    } catch (err) {
        // If any error occurs in try block, send error message
        res.send(err.message);
    }
};