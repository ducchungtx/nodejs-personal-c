const User = require('../models/userModel');
const authService = require('../services/auth.service');
const { sendResponse } = require('../helpers');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return sendResponse(res, 401, { message: 'Invalid email or password' });
    }
    const isMatch = await authService.comparePasswords(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 401, { message: 'Invalid email or password' });
    }

    const accessToken = authService.generateAccessToken({ id: user.id });
    const refreshToken = await authService.generateRefreshToken({ id: user.id });

    return sendResponse(res, 200, { accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, { message: 'Server error' });
  }
};

module.exports = {
  login,
};
