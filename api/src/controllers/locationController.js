const {
  editLocationValidator,
  createLocationValidator,
} = require("../lib/validationRules");
const locationService = require("../services/locationService");

const validationError = (errors) => errors.map((i) => i.message).join(", ");
const errorResponseObj = (message) => ({ success: false, message });

const getLocations = async (req, res) => {
  try {
    const retVal = await locationService.getLocations();
    if (retVal === null) {
      return res.status(400).json(errorResponseObj("Failed to get locations"));
    }
    return res.status(200).json({
      success: true,
      data: retVal,
      message: "Locations fetched successfully",
    });
  } catch (error) {
    return res.status(500).json(errorResponseObj(error.message));
  }
};

const editLocation = async (req, res) => {
  const errors = editLocationValidator.validate(req.body);
  if (errors.length > 0) {
    return res.status(400).json(errorResponseObj(validationError(errors)));
  }
  try {
    const retVal = await locationService.editLocation(req.body);
    if (retVal === null) {
      return res.status(400).json(errorResponseObj("Failed to edit location"));
    }
    return res.status(200).json({
      success: true,
      data: retVal,
      message: "Location edited successfully",
    });
  } catch (error) {
    return res.status(500).json(errorResponseObj(error.message));
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

const addLocation = async (req, res) => {
  const errors = createLocationValidator.validate(req.body);
  if (errors.length > 0) {
    return res.status(400).json(errorResponseObj(validationError(errors)));
  }
  try {
    const newLocation = await locationService.createLocation(req.body);
    return res.status(200).json({
      success: true,
      data: newLocation,
      message: "Location added successfully",
    });
  } catch (error) {
    return res.status(500).json(errorResponseObj(error.message));
  }
};

module.exports = {
  getLocations,
  editLocation,
  deleteLocation,
  addLocation,
};
