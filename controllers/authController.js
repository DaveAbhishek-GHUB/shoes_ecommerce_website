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

module.exports.loginUser = async function (req, res) {
    // Extract email and password from request body
    let {email, password} = req.body;

    // Find user in database by email
    let user = await userModel.findOne({email: email});

    // If user doesn't exist, send message to register
    if(!user){
        return res.send("You need to register first");
    }

    // Compare provided password with stored hashed password
    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            // If passwords match
            // Generate a token for the user
            let token = generateToken(user);
            // Set the token as a cookie
            res.cookie("token", token);
            // Send success message
            res.send("login Successfully");
        }else{
            // If passwords don't match, send error message
            return res.send("email or password incorrect");
        }
    });
};