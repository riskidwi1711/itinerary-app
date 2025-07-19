const responseMiddleware = (req, res, next) => {
  res.success = (data, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };

  res.error = (message = 'Error', statusCode = 500, error = null) => {
    res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  };

  next();
};

export default responseMiddleware;
