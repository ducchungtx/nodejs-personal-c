const jwt = require('jsonwebtoken');
const { sendResponse } = require('../helpers');

const auth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    sendResponse(res, 401, { message: 'Unauthorized access' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    sendResponse(res, 401, { message: 'Invalid token' });
  }
};

module.exports = auth;
