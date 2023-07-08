const { ErrorResponse } = require("../lib/pickup");
const { generateUniqueId, generateCode } = require("../lib/utils");
const {
  pickUpValidator,
  locationValidator,
} = require("../lib/validationRules");
const pickUpService = require("../services/pickUpService");
const locationService = require("../services/locationService");
const { SuccessResponse } = require("../lib/pickup");

const handleValidationError = (res, errors) => {
  return res
    .status(400)
    .json(new ErrorResponse({ message: errors.map((i) => i.message).join(", ") }));
}

const addPickUp = async (req, res, next) => {
  let isLocationCreated = false;
  if (!req.body.locationId || (req.body.locationId && !req.body.location)) {

    const errors = locationValidator.validate(req.body.location);
    if (errors.length > 0) return handleValidationError(res, errors);

    req.body.location.id = req.body.location.id || generateUniqueId();
    req.body.action = req.body.locationId ? "edit" : "add";
    
    if (!req.body.locationId) {
      await locationService.createLocation(
        req.body.location
      );
      req.body.locationId = req.body.location.id
    }
  }

  req.body.id = generateUniqueId();
  req.body.code = generateCode(req.body.name);
  const errors = pickUpValidator.validate(req.body);
  if (errors.length > 0) return handleValidationError(res, errors);

  try {
    const retVal = await pickUpService.addPickUp(req.body);
    isLocationCreated = true;
    if (req.body.action === "edit") {
      await locationService.editLocation(
        req.body.location
      );
    }

    return res
      .status(201)
      .json(
        new SuccessResponse({
          data: retVal,
          message: "Pick Up Point added successfully",
        })
      );
  } catch (error) {
    if (isLocationCreated) {
      await locationService.deleteLocation(req.body.locationId);
    }

    if (error.code === "42703") {
      return res
        .status(400)
        .json(new ErrorResponse({ message: "Location isn't valid" }));
    }
    if (error.code === "23505") {
      return res
        .status(400)
        .json(new ErrorResponse({ message: "Pick Up Point already exists" }));
    }
    next(error);
  }
};

const editPickUp = async (req, res, next) => {
  const errors = pickUpValidator.validate(req.body);
  if (errors.length > 0) {
    return res
      .status(400)
      .json(new ErrorResponse({ message: errors.join(", ") }));
  }
  try {
    const retVal = await pickUpService.editPickUp(req.body);
    if (retVal === null) {
      return res
        .status(400)
        .json(new ErrorResponse({ message: "Failed to edit pick up point" }));
    }
    return res
      .status(200)
      .json(
        new SuccessResponse({
          data: retVal,
          message: "Pick Up Point updated Successfully",
        })
      );
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ErrorResponse({ message: error.message }));
  }
};

const getPickUp = async (req, res, next) => {
  try {
    const retVal = await pickUpService.getPickUp(req.params.id);
    if (retVal === null)
      return res
        .status(400)
        .json(new ErrorResponse({ message: "Failed to get pick up" }));
    return res.status(200).json(new SuccessResponse({ data: retVal }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ErrorResponse({ message: error.message }));
  }
};

const getPickUpPoints = async (req, res, next) => {
  try {
    const retVal = await pickUpService.getPickUpPoints();
    if (retVal === null)
      return res
        .status(400)
        .json(new ErrorResponse({ message: "Failed to get pick up points" }));
    return res.status(200).json(new SuccessResponse({ data: retVal }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ErrorResponse({ message: error.message }));
  }
};

const deletePickUp = async (req, res, next) => {
  try {
    const retVal = await pickUpService.deletePickUp(req.params.id);
    if (retVal === null)
      return res
        .status(400)
        .json(new ErrorResponse({ message: "Failed to delete pickup" }));
    return res
      .status(200)
      .json(
        new SuccessResponse({ message: "Pick Up Point deleted successfully" })
      );
  } catch (error) {
    return res.status(500).json(new ErrorResponse({ message: error.message }));
  }
};

module.exports = {
  addPickUp,
  deletePickUp,
  getPickUpPoints,
  getPickUp,
  editPickUp,
};
