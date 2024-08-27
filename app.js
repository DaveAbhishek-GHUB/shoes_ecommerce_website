// Import required modules
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
require('dotenv').config();

// Import custom modules
const dbConnection = require('./config/mongodb-connection');
const indexRouter = require('./routes/indexRouter');
const ownersRouter = require("./routes/ownersRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use routers
app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", userRouter);
app.use("/product", productRouter);

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port 3000`);
});