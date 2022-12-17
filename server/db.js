const mongoose = require("mongoose");

//load environment variables
const dotenv = require("dotenv");
dotenv.config();

//connect to MongoDB
module.exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB started");
    })
    .catch((error) => console.log("Error connecting to MongoDB", error));
};
