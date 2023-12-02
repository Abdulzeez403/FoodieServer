const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");

const protected = asyncHandler(async (req, res, next) => {
    let token;

    // Check if the token is in the cookies
    token = req.cookies.jwt;


    // If there's no token in cookies, check the headers
    if (!token && (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))) {
        token = req.headers.authorization.split(" ")[1];
    }


    if (!token) {
        res.status(401);
        throw new Error("Not authorized, No token");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decoded.UserId).select("-password");
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, Invalid token");
    }
});

module.exports = { protected };