const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verifies the JWT and attaches the user to req.user
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      if (!req.user) {
        return res.status(401).json({ message: "User no longer exists" });
      }
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};

// Restricts a route to admin users only. Use after `protect`.
const adminOnly = (req, res, next) => {
  if (req.user?.role === "admin") return next();
  return res.status(403).json({ message: "Admin access required" });
};

module.exports = { protect, adminOnly };
