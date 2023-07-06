const { ErrorResponse } = require("../lib/pickup");
const { generateUniqueId, generateCode } = require("../lib/utils");
const {
  pickUpValidator,
  locationValidator,
} = require("../lib/validationRules");
const pickUpService = require("../services/pickUpService");
const locationService = require("../services/locationService");
const { SuccessResponse } = require("../lib/pickup");

const addPickUp = async (req, res, next) => {
  if (!req.body.locationId) {
    const errors = locationValidator.validate(req.body.location);
    if (errors.length > 0) {
      return res
        .status(400)
        .json(new ErrorResponse({ message: errors.join(", ") }));
    }
    req.body.location.id = generateUniqueId();
    try {
      const newLocationId = await locationService.createLocation(
        req.body.location
      );
      req.body.locationId = newLocationId;
    } catch (err) {
      console.log(err);
    }
  } else if (req.body.locationId && req.body.location) {
    const errors = locationValidator.validate(req.body.location);
    if (errors.length > 0) {
      return res
        .status(400)
        .json(new ErrorResponse({ message: errors.join(", ") }));
    }
    req.body.location.id = generateUniqueId();
    try {
      const editedLocation = await locationService.editLocation(
        req.body.location
      );
      // console.log(editedLocation);
      req.body.locationId = editedLocation.id;
    } catch (error) {
      console.log(error);
    }
  }
  delete req.body.location;
  req.body.id = generateUniqueId();
  req.body.code = generateCode(req.body.name);
  // console.log(req.body)
  const errors = pickUpValidator.validate(req.body);
  if (errors.length > 0) {
    return res
      .status(400)
      .json(
        new ErrorResponse({ message: errors.map((i) => i.message).join(", ") })
      );
  }
  try {
    const retVal = await pickUpService.addPickUp(req.body);
    if (retVal === null)
      return res
        .status(400)
        .json(new ErrorResponse({ message: "Failed to add new pickup" }));
    return res
      .status(201)
      .json(
        new SuccessResponse({
          data: retVal,
          message: "Pick Up Point added successfully",
        })
      );
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ErrorResponse({ message: error.message }));
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
        .json(ErrorMessage({ message: "Failed to get pick up points" }));
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
