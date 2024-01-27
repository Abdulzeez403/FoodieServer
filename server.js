const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const MongodbConnect = require("./config/db.js");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors")


require('dotenv').config()
app.use(logger('dev'));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(cors({
    origin: ["https://foodie-web-nine.vercel.app/", "https://foodieserver.onrender.com/", "http://localhost:3001"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

app.use("/api/", require('./Routes/userRoutes'))
app.use("/api/", require('./Routes/restaurantRoutes'))
app.use("/api/", require('./Routes/orderRoutes'))
app.use("/api/", require('./Routes/reviewRoutes'))
app.use("/api/", require('./Routes/menuRoutes'))
app.use("/api/", require("./Routes/cartRoutes"));
app.use("/api/pay", require("./Routes/paymentRoutes"));


MongodbConnect();
app.listen(PORT, (req, res) => {
    console.log(`This Server is running on port ${PORT}`);
});

