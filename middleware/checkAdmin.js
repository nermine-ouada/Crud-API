const checkAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next(); 
  }
  return res.status(403).json({ message: "Access forbidden: Admins only" });
};

module.exports = checkAdmin;
