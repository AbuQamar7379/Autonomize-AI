const dotenv = require("dotenv");
const path = require("path");
const envVars = process.env;

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "../../.env") });

/**
 * Configuration object containing environment variables.
 * @typedef {Object} Config
 * @property {number} port - Port number for the server.
 * @property {string} mongoUri - MongoDB connection URI.
 * @property {string} githubApi - GitHub API base URL.
 */

/**
 * Configuration object containing environment variables.
 * @type {Config}
 */
module.exports = {
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI,
  githubApi: envVars.GithubApi,
};
