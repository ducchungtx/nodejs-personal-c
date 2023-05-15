const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendResponse } = require('../helpers');
const userService = require('../services/user.service');
const RefreshToken = require('../models/refreshToken.model');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await userService.getUserByEmail(email);
    if (!user) {
      sendResponse(res, 401, { message: 'Invalid credentials' });
      return;
    }

    // Check if password is correct
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      sendResponse(res, 401, { message: 'Invalid credentials' });
      return;
    }

    // Generate access token
    const accessToken = jwt.sign({ user: user.id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });

    // Generate refresh token
    const refreshToken = jwt.sign({ user: user.id }, process.env.JWT_REFRESH_SECRET);

    // Save refresh token to database
    const newRefreshToken = new RefreshToken({ token: refreshToken });
    await newRefreshToken.save();

    // Send response with access token and refresh token
    sendResponse(res, 200, { accessToken, refreshToken });
  } catch (error) {
    sendResponse(res, 500, { message: 'Server error' });
  }
};

module.exports = {
  login,
};
