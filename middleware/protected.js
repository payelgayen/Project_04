const protectedRoute = (req, res, next) => {
  if (!req.session.userId) {
    res.clearCookie("mrcoffee_sid");
    res.redirect("/login");
  } else {
    next();
  }
};

const successRoute = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = { protectedRoute, successRoute };
