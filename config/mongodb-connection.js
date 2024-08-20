// Import the mongoose library and config module (assumed to be set up elsewhere)
const mongoose = require('mongoose');
const config = require('config');

// Connect to MongoDB
mongoose.connect(`${config.get("MONGODB_URI")}/nike`)
    .then(function(){
        // If connection is successful, log a success message
        console.log("connected");
    })
    .catch(function(err){
        // If there's an error in connection, log the error
        console.log(err);
    });

// Export the mongoose connection object
module.exports = mongoose.connection;