const router = require('express').Router();
const routeController = require('../controllers/routeController');

router.post('/', routeController.addRoute);
router.get('/', routeController.getRoutes);
router.delete('/:routeId', routeController.deleteRoute);
router.put('/:routeId', routeController.editRoute);
router.put('/:routeId/map', routeController.mapPickupPointsToRoute);
router.put("/:routeId/schedule", routeController.createRouteSchedule);

module.exports = router;