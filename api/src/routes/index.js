const errorHandler = require('../middlewares/errorHandler');

module.exports = function (app) {
<<<<<<< HEAD
  // app.use(logger)
  // console.log("hello")
=======
>>>>>>> 501b8c67f727b5e77e7ac9f2beeb8760fca989de
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

<<<<<<< HEAD
  // app.use(errorHandler())
=======
  app.use(errorHandler)
>>>>>>> 501b8c67f727b5e77e7ac9f2beeb8760fca989de
  
};
