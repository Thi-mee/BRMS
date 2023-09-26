const {errorHandler} = require('../middlewares/errorHandler');

module.exports = function (app) {
  app.use('/api/auth', require('./authroute'));
  app.use('/api/pickup-points', require('./pickUpRoutes'));
  app.use('/api/locations', require('./locationRoutes'));
  app.use('/api/routes', require('./routeMgtRoutes'));
  
  // handle non-matching routes
  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Invalid api endpoint',
    });
  });

  app.use(errorHandler)
  
};
