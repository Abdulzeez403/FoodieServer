const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const MongodbConnect = require("./config/db.js");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors")


app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(cors())

app.use("/api/", require('./Routes/userRoutes'))
app.use("/api/", require('./Routes/restaurantRoutes'))
app.use("/api/", require('./Routes/orderRoutes'))
app.use("/api/", require('./Routes/reviewRoutes'))
app.use("/api/", require('./Routes/menuRoutes'))
app.use("/api", require("./Routes/cartRoutes"));


MongodbConnect();
app.listen(PORT, (req, res) => {
    console.log(`This Server is running on port ${PORT}`);
});

