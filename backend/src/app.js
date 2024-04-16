const httpStatus = require("http-status");
const express = require("express");
const cors = require("cors"); // Middleware for handling Cross-Origin Resource Sharing
const app = express(); // Creating an instance of the Express application

app.use(express.json()); // Middleware to parse incoming JSON requests

app.use(cors()); // Using CORS middleware to enable cross-origin requests

// Default route handler for the root URL "/"
app.use("/", (req, res) =>
  res
    .status(httpStatus.OK)
    .send("<h2>GitHub Explorer server running............</h2>")
);

module.exports = app; // Exporting the Express application instance
