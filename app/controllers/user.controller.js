const { sendResponse } = require('../helpers');
const userService = require('../services/user.service');

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.createUser(name, email, password);
    console.log('user', user);
    sendResponse(res, 201, { user });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      sendResponse(res, 404, { message: 'User not found' });
    } else {
      sendResponse(res, 200, { user });
    }
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    console.log('users', users);
    sendResponse(res, 200, { users });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.updateUser(req.params.id, name, email, password);
    if (!user) {
      sendResponse(res, 404, { message: 'User not found' });
    } else {
      sendResponse(res, 200, { user });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    // const userExists = await userService.getUserById(req.params.id);
    // if(!userExists) sendResponse(res, 404, { message: 'User not found' });
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      sendResponse(res, 404, { message: 'User not found' });
    } else {
      sendResponse(res, 204, null);
    }
  } catch (err) {
    next(err);
  }
};
