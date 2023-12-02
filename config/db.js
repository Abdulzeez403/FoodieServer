const mongoose = require("mongoose");

//connect to the mongodb
const dbase = async () => {
  const MONGO_URL = "mongodb+srv://BlogUser:12345@cluster0.aulb9dq.mongodb.net/?retryWrites=true&w=majority"
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbase;
