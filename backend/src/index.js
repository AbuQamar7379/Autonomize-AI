const mongoose = require("mongoose"); // Importing mongoose for database connectivity
const { port, mongoUri } = require("./config/config"); // Importing port number and MongoDB URI from config file
const app = require("./app"); // Importing the Express application instance

mongoose
  .connect(mongoUri) // Connecting to MongoDB using the provided URI
  .then(() => {
    console.log("Mongo DB connected"); // Logging a success message upon successful database connection

    // Starting the Express server and listening on the specified port
    app.listen(port, () => console.log("Server running at " + port));
  })
  .catch((err) => console.log("Failed to connected DB", err)); // Handling errors if database connection fails
