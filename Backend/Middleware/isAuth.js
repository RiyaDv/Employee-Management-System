const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.json({
      message: "Token expired or invalid. Please login again.",
    });
  }
};

const isAdmin = (req, res, next) => {
  isAuth(req, res, () => {
    if (req.user.role === "admin") {
      req.employee = req.params;
      next();
    } else {
      res.json({
        message:
          "You are not authorized to perform this action. Admin Access Required",
      });
    }
  });
};

module.exports = { isAuth, isAdmin };
