const jwt = require('jsonwebtoken');
const { sendResponse } = require('../helpers');
const authService = require('../services/auth.service');

const auth = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return sendResponse(res, 401, { message: 'Unauthorized access' });
  }

  try {
    const decoded = authService.verifyToken(token);
    req.user = decoded.user;
    next();
  } catch (error) {
    return sendResponse(res, 401, { message: 'Invalid token' });
  }
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return sendResponse(res, 401, { message: 'Unauthorized access' });
  }

  try {
    const decoded = authService.verifyToken(refreshToken);
    const user = decoded.user;

    const savedToken = await RefreshToken.findOne({ where: { token: refreshToken } });
    if (!savedToken) {
      return sendResponse(res, 401, { message: 'Invalid refresh token' });
    }

    const accessToken = authService.generateAccessToken(user);
    const newRefreshToken = await authService.generateRefreshToken(user);
    savedToken.token = newRefreshToken;
    await savedToken.save();

    return sendResponse(res, 200, { accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    return sendResponse(res, 401, { message: 'Invalid token' });
  }
};

module.exports = {
  auth,
  refresh,
};
