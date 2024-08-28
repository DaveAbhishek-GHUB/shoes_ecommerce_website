// Import the multer library
const multer = require("multer");

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// Create a multer instance with the memory storage configuration
const upload = multer({storage: storage});

// Export the configured multer instance
module.exports = upload;