const mongoose = require("mongoose");
require("dotenv").config();

const DbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Database Connection established"))
    .catch((error) => {
      console.log("Error Occurred:", error.message);
    });
};

module.exports = DbConnect;
