const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.createUser = async (name, email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return user;
};

exports.getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

exports.getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

exports.updateUser = async (id, name, email, password) => {
  const user = await User.findByPk(id);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.name = name;
  user.email = email;
  user.password = hashedPassword;
  await user.save();
  return user;
};

exports.deleteUser = async (id) => {
  const user = await User.findByPk(id);
  await user.destroy();
};
