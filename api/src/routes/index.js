const errorHandler = require('../middlewares/errorHandler');

module.exports = function (app) {

  app.use('/api/auth', require('./authroute'));
  app.use('/api/pickup-points', require('./pickUpRoutes'));
  app.use('/api/location', require('./locationRoutes'));

  app.use(errorHandler())
  
};
