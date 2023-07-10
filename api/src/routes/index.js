const errorHandler = require('../middlewares/errorHandler');
const logger = require('../middlewares/logger');

module.exports = function (app) {
  app.use(logger)
  app.use('/api/auth', require('./authroute'));
  app.use('/api/pickup-points', require('./pickUpRoutes'));
  app.use('/api/location', require('./locationRoutes'));

  app.use(errorHandler())
  
};
