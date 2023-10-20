const mongoose = require ('mongoose');
const mongoURI = "mongodb://0.0.0.0/ibook";

// Create A Function For Connecting With DB :: 
const connectToMongo = async ()=> {
    try {
      await mongoose.connect(mongoURI);
      console.log("Connected to DB !!");
    } 
    catch (error) {
      console.error("Error connecting to DB:", error);
    }
  };

module.exports = connectToMongo;