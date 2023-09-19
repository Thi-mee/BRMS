const { routeValidator } = require("../lib/validationRules");
const { scheduleRouteValidator } = require("../lib/validationRules");
const routeService = require("../services/routeService");
const mapService = require("../services/mappedService");
const schedulingRoute = require("../services/routeSchedulingService");

const handleValidationError = (res, errors) => {
  return res
    .status(400)
    .json(errorResponseObj(errors.map((i) => i.message).join(", ")));
};

const errorResponseObj = (message) => ({ success: false, message });

const addRoute = async (req, res, next) => {
  const errors = routeValidator.validate(req.body);
  if (errors.length > 0) return handleValidationError(res, errors);

  try {
    const retVal = await routeService.addRoute(req.body);
    if (!retVal) {
      return res.status(409).json(errorResponseObj("Route already exists"));
    }
    return res.status(201).json({
      success: true,
      data: retVal,
      message: "Route added successfully",
    });
  } catch (error) {
    return res.status(409).json(errorResponseObj(error.message));
  }
};

const getRoutes = async (req, res, next) => {
  try {
    const retVal = await routeService.getRoutes();
    return res.status(200).json({
      success: true,
      data: retVal,
      message: "Routes fetched successfully",
    });
  } catch (error) {
    return res.status(500).json(errorResponseObj(error.message));
  }
};

const deleteRoute = async (req, res, next) => {
  try {
    const retVal = await routeService.deleteRoute(req.params.routeId);
    if (!retVal) {
      console.log(retVal);
      return res.status(404).json(errorResponseObj("Route not found"));
    }
    return res.status(200).json({
      success: true,
      data: retVal,
      message: "Route deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(errorResponseObj(error.message));
  }
};

const editRoute = async (req, res, next) => {
  const errors = routeValidator.validate(req.body);
  if (errors.length > 0) return handleValidationError(res, errors);

  try {
    const retVal = await routeService.editRoute(req.body);
    if (!retVal) {
      return res.status(404).json(errorResponseObj("Route not found"));
    }
    return res.status(200).json({
      success: true,
      data: retVal,
      message: "Route edited successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(errorResponseObj(error.message));
  }
};

const mapPickupPointsToRoute = async (req, res, next) => {
  const routeId = req.params.routeId;
  if (!Array.isArray(req.body)) {
    return res
      .status(400)
      .json(
        errorResponseObj(
          "Pickup points must be an array of valid pickup points"
        )
      );
  }
  const pickupPoints = req.body;

  const isLengthValid = pickupPoints.every(
    (point) => !!point && point.length > 15 && point.length < 30
  );
  if (!isLengthValid) {
    return res
      .status(400)
      .json(
        errorResponseObj(
          "Pickup points must be an array of valid pickup points"
        )
      );
  }

  try {
    const retVal = await mapService.mapPickupPointsToRoute(
      routeId,
      pickupPoints
    );
    return res.status(200).json({
      success: true,
      data: retVal,
      message: "Pickup points mapped successfully",
    });
  } catch (error) {
    return res.status(409).json(errorResponseObj(error.message));
  }
};

const createRouteSchedule = async (req, res) => {
  const routeId = req.params.routeId;
  const schedule = req.body;
  if (!Array.isArray(schedule)) {
    return res
      .status(400)
      .json({ message: "Schedule must be an array of valid schedule objects" });
  }
  const errors = schedule.map((entry) =>
    scheduleRouteValidator.validate(entry)
  );
  if (errors[0].length > 0) return handleValidationError(res, errors[0]);

  try {
    const retVal = await schedulingRoute.scheduleRoute(routeId, schedule);
    console.log(retVal);
    return res.status(200).json({
      success: true,
      data: retVal,
      message: "Route scheduled successfully.",
    });
  } catch (error) {
    console.error("Error scheduling route:", error);
    res.status(500).json({ error: "Failed to schedule route." });
  }
};

const getMappedRoutes = async (req, res) => {
  try {
    const retVal = await mapService.getMappedRoutes();
    return res.status(200).json({
      success: true,
      data: retVal,
      message: "Routes fetched successfully",
    });
  } catch (error) {
    return res.status(500).json(errorResponseObj(error.message));
  }
}

module.exports = {
  addRoute,
  getRoutes,
  deleteRoute,
  editRoute,
  mapPickupPointsToRoute,
  createRouteSchedule,
  getMappedRoutes
};
