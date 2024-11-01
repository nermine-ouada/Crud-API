const checkUserOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === "user" || req.user.role === "admin")) {
    return next(); 
  }

  return res
    .status(403)
    .json({ message: "Access forbidden: Users and Admins only" });
};

module.exports = checkUserOrAdmin;
