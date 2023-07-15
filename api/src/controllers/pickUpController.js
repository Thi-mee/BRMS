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
  if (req.body.location) {
    const errors = locationValidator.validate(req.body.location);
    if (errors.length > 0) return handleValidationError(res, errors);

    req.body.location.id = generateUniqueId();
    await locationService.createLocation(
      req.body.location
    );
    isLocationCreated = true;
    req.body.locationId = req.body.location.id
    delete req.body.location;
  }

  req.body.id = generateUniqueId();
  req.body.code = generateCode(req.body.name);
  const errors = pickUpValidator.validate(req.body);
  if (errors.length > 0) return handleValidationError(res, errors);

  try {
    const retVal = await pickUpService.addPickUp(req.body);
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
    return res.status(409).json(new ErrorResponse({ message: error.message }));
  }
};

const addBulkPickups = async (req, res, next) => {
  const { body } = req;
  const bulkErrors = [];

  if (!Array.isArray(body)) {
    return res.status(400).json(new ErrorResponse({ message: 'Invalid request body. Expected an array.' }));
  }

  const pickupPromises = body.map(async (pickup) => {
    if (pickup.location) {
      const errors = locationValidator.validate(pickup.location);
      if (errors.length > 0) return handleValidationError(res, errors);
      pickup.location.id = generateUniqueId();
      try {
        await locationService.createLocation(pickup.location);
        pickup.locationId = pickup.location.id;
        delete pickup.location;
      } catch (error) {
        bulkErrors.push({ success: false, error: error.message });
      }
    }

    pickup.id = generateUniqueId();
    pickup.code = generateCode(pickup.name);
    const errors = pickUpValidator.validate(pickup);
    if (errors.length > 0) bulkErrors.push({ success: false, error: errors.map((i) => i.message).join(', ') });

    try {
      const retVal = await pickUpService.addPickUp(pickup);
      return { success: true, data: retVal };
    } catch (error) {
      await locationService.deleteLocation(pickup.locationId);
      return { success: false, error: error.message };
    }
  });

  try {
    const results = await Promise.all(pickupPromises);
    const successfulResults = results.filter((result) => result.success);
    const failedResults = results.filter((result) => !result.success);

    const response = {
      status: successfulResults.length > 0 ? 'success' : 'failed',
      message: 'Bulk pickups added successfully' + (failedResults.length > 0 ? '. Failed to add ' + failedResults.length + ' pickups' : ''),
      data: successfulResults.map((result) => result.data)
    }

    return res.status(
      successfulResults.length > 0 ? 201 : 400
    ).json(response);
  } catch (error) {
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



