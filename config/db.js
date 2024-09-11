const mongoose = require("mongoose");

const dbase = async () => {
  try {
    const MONGO_URL = process.env.MONGO_URL;

    if (!MONGO_URL) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }

    const options = {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 5000,
    };

    await mongoose.connect(MONGO_URL, options);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    // Properly log the error message
    console.error(`Error connecting to MongoDB: ${err.message}`);

    // Optionally, implement a retry mechanism if needed
    setTimeout(dbase, 5000); // Retry connection after 5 seconds
  }
};

module.exports = dbase;
