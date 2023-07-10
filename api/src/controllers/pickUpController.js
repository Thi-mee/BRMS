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

const addBulkPickups = async (req, res, next) => {
  const { body } = req;

  if (!Array.isArray(body)) {
    return res.status(400).json(new ErrorResponse({ message: 'Invalid request body. Expected an array.' }));
  }

  const pickupPromises = body.map(async (pickup) => {
    if (!pickup.locationId || (pickup.locationId && !pickup.location)) {
      const errors = locationValidator.validate(pickup.location);
      if (errors.length > 0) {
        return { success: false, error: errors.map((i) => i.message).join(', ') };
      }

      pickup.location.id = pickup.location.id || generateUniqueId();
      pickup.action = pickup.locationId ? 'edit' : 'add';

      if (!pickup.locationId) {
        await locationService.createLocation(pickup.location);
        pickup.locationId = pickup.location.id;
      }
    }

    pickup.id = generateUniqueId();
    pickup.code = generateCode(pickup.name);
    const errors = pickUpValidator.validate(pickup);
    if (errors.length > 0) {
      return { success: false, error: errors.map((i) => i.message).join(', ') };
    }

    try {
      const retVal = await pickUpService.addPickUp(pickup);
      if (pickup.action === 'edit') {
        await locationService.editLocation(pickup.location);
      }
      return { success: true, data: retVal };
    } catch (error) {
      if (pickup.action === 'add') {
        await locationService.deleteLocation(pickup.locationId);
      }

      if (error.code === '42703') {
        return { success: false, error: "Location isn't valid" };
      }
      if (error.code === '23505') {
        return { success: false, error: 'Pick Up Point already exists' };
      }
      throw error;
    }
  });

  try {
    const results = await Promise.all(pickupPromises);
    const successfulResults = results.filter((result) => result.success);
    const failedResults = results.filter((result) => !result.success);

    if (successfulResults.length > 0) {
      return res.status(201).json(new SuccessResponse({ data: successfulResults.map((result) => result.data) }));
    }

    if (failedResults.length > 0) {
      return res.status(400).json(new ErrorResponse({ message: failedResults.map((result) => result.error).join(', ') }));
    }

    return res.status(400).json(new ErrorResponse({ message: 'Failed to add bulk pickups' }));
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
  addBulkPickups
};



