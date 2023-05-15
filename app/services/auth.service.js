const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const RefreshToken = require('../models/refreshTokenModel');

const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = async (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET_REFRESH);
  const refreshToken = await RefreshToken.create({ token });
  return refreshToken.token;
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePasswords = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  hashPassword,
  comparePasswords,
};
