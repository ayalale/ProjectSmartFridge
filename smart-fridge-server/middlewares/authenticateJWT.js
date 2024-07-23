const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log('Authenticated user:', user);
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
