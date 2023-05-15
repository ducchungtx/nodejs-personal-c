const sendResponse = (res, statusCode, data) => {
  res.status(statusCode).json({
    status: statusCode >= 200 && statusCode < 300 ? 'success' : 'fail',
    data,
  });
};

module.exports = {
  sendResponse
}