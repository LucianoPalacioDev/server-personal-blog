const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({id: user.id}, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const authenticateToken = (req, res, next) => {
  const token = req.headers['auth'];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
  generateToken,
};
