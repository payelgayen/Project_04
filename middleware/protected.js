
   const protectedRoute = (req, res, next) => {
    if (!req.session.userId) {
      console.log('No login, redirecting to login page');
      res.clearCookie('mrcoffee_sid');
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  const successRoute = (req, res, next) => {
    if (req.session.userId) {
      console.log('You are logged in, redirecting to home page');
      res.redirect('/');
    } else {
      next();
    }
  };
  
  module.exports = { protectedRoute, successRoute };