function errorHandler(err, req, res, next) {
  res.status(500).json({
    success: false,
    message: "something went wrong",
    error: err.msg,
  });
}

module.exports = { errorHandler };
