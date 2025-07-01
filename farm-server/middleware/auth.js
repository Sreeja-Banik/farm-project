const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Authenticate user
exports.authenticate = async (req, res, next) => {
  try {
    // console.log(req);
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(401).json({ error: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Add user info to req
    if (!req.user) return res.status(401).json({ error: "User not found" });

    next();
  } catch (error) {
    // Token expiration or invalid token handling
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token is invalid" });
    }

    // Generic error response
    res.status(500).json({ error: "Server error" });
  }
};

// Authorize roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};
