const mappedService  = require('../services/mappedService');

const mapPickupPointsToRoute = async (req, res, next) => {
  try {
    const retVal = await mappedService.createMappedRoutes(req.params.routeId, req.body.pickupPoints);
    return res.status(200).json({
      message: 'Pickup points mapped successfully',
      data: retVal
    });
  } catch (error) {
    return res.status(500).json(new ErrorResponse({message: error.message}));
  }
}

module.exports = {mapPickupPointsToRoute};