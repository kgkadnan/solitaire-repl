// axiom.config.js
module.exports = {
  token: process.env.AXIOM_TOKEN, // Your Axiom token
  dataset: 'solitaire', // Name of the dataset where logs will be stored
  env: process.env.NODE_ENV // Set the environment (development or production)
};
