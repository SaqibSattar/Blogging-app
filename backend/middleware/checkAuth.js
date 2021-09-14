var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    var token = req.headers.authorization.split(" ")[1];
    console.log(token);
    jwt.verify(token, 'secret');
    next();
  } catch (e) {
    res.status(401).json({
      Error: 'Headers not found'
    });
  }
}
