const authorizeRole = (role) => {
    return (req, res, next) => {
      console.log('User role:', req.user.role);
      if (req.user.role !== role) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    };
  };
  
  module.exports = authorizeRole;
  