const error = require("../../../utils/error/error");
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if(token) {
    const authToken = token.split(' ')[1];
    jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(401).json({ error: error.invalidToken });
      }
      else {
        req.user = decoded;
        next();
      }
    });
  }
  else {
    return res.status(401).json({ error: error.noToken });
  }
};

module.exports = {
  verifyToken,
};
