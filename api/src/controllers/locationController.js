const {
  editLocationValidator,
  createLocationValidator,
} = require("../lib/validationRules");
const locationService = require("../services/locationService");
const {throwApplicationError} = require("../middlewares/errorHandler");

const validationError = (errors) => errors.map((i) => i.message).join(", ");
const errorResponseObj = (message) => ({ success: false, message });

const getLocations = async (req, res, next) => {
  try {
    const retVal = await locationService.getLocations();
    if (retVal === null) {
      throwApplicationError(400, "Failed to get locations")
    }
    return res.status(200).json({
      success: true,
      data: retVal,
      message: "Locations fetched successfully",
    });
  } catch (error) {
    next(error)
  }
};

const editLocation = async (req, res, next) => {
  const errors = editLocationValidator.validate(req.body);
  if (errors.length > 0) {
    throwApplicationError(400, validationError(errors))
  }
  try {
    const retVal = await locationService.editLocation(req.body);
    if (retVal === null) {
      throwApplicationError(400, "Failed to edit location")
    }
    return res.status(200).json({
      success: true,
      data: retVal,
      message: "Location edited successfully",
    });
  } catch (error) {
    next(error)
  }
};

const deleteLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const retVal = await locationService.deleteLocation(locationId);
    if (retVal === null) {
      return res
        .status(400)
        .json(errorResponseObj("Failed to delete location"));
    }
    return res.status(200).json({
      success: true,
      data: retVal,
      message: "Location deleted successfully",
    });
  } catch (error) {
    return res.status(409).json(errorResponseObj(error.message));
  }
};

const addLocation = async (req, res, next) => {
  const errors = createLocationValidator.validate(req.body);
  if (errors.length > 0) {
    throwApplicationError(400, validationError(errors))
  }
  try {
    const newLocation = await locationService.createLocation(req.body);
    return res.status(200).json({
      success: true,
      data: newLocation,
      message: "Location added successfully",
    });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getLocations,
  editLocation,
  deleteLocation,
  addLocation,
};
