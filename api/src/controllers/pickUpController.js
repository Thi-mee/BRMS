const { ErrorResponse } = require("../lib/pickup");
const { handleValidationError } = require("../utils/helper");
const validators = require("../lib/validationRules");
const pickUpService = require("../services/pickUpService");
const { SuccessResponse } = require("../lib/pickup");
const {
  createLocationAndPickup,
} = require("../services/pickupLocationService");
// console.log("hello")

const addPickUp = async (req, res) => {
  let pickupPoint;

  try {
    if (req.body.locationId) {
      const errors = validators.pickUpWithLocationIdValidator.validate(
        req.body
      );
      if (errors.length > 0) return handleValidationError(res, errors);
      pickupPoint = await pickUpService.addPickUp(req.body);
    } else if (req.body.location) {
      let errors = validators.createLocationValidator.validate(
        req.body.location
      );
      if (errors.length > 0) return handleValidationError(res, errors);
      errors = validators.createPickUpValidator.validate(req.body);
      if (errors.length > 0) return handleValidationError(res, errors);
      pickupPoint = await createLocationAndPickup(req.body);
    } else {
      return res.status(400).json(
        new ErrorResponse({
          message: "Invalid request body. Expected locationId or location",
        })
      );
    }
    return res.status(201).json(
      new SuccessResponse({
        data: pickupPoint,
        message: "Pick Up Point added successfully",
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(409).json(new ErrorResponse({ message: error.message }));
  }
};

const addBulkPickups = async (req, res) => {
  const { body } = req;
  const bulkErrors = [];
  if (!Array.isArray(body)) {
    return res.status(400).json(
      new ErrorResponse({
        message: "Invalid request body. Expected an array.",
      })
    );
  }

  const pickupCreationPromises = body.map(async (pickup) => {
    if (pickup.locationId) {
      const errors = validators.pickUpWithLocationIdValidator.validate(pickup);
      if (errors.length > 0) return handleValidationError(res, errors);
      try {
        return await pickUpService.addPickUp(pickup);
      } catch (e) {
        bulkErrors.push(e.message);
        return null;
      }
    } else if (pickup.location) {
      let errors = validators.createLocationValidator.validate(
        req.body.location
      );
      if (errors.length > 0) {
        bulkErrors.push(errors.map((i) => i.message).join(", "));
        return null;
      }

      errors = validators.createPickUpValidator.validate(req.body);
      if (errors.length > 0) {
        bulkErrors.push(errors.map((i) => i.message).join(", "));
        return null;
      }
      try {
        return await createLocationAndPickup(pickup);
      } catch (error) {
        bulkErrors.push(error.message);
        return null;
      }
    } else {
      bulkErrors.push("Invalid request body. Expected locationId or location");
      return null;
    }
  });

  try {
    const results = await Promise.all(pickupCreationPromises);
    const successfulResults = results.filter((result) => result !== null);

    const successSnippet = `${successfulResults.length} pickup points added successfully.`;
    const failedSnippet = `Failed to add ${bulkErrors.length} pickup points.`;
    const anySuccessFul = successfulResults.length > 0;
    const anyFailed = bulkErrors.length > 0;
    const response = {
      status: anySuccessFul ? "success" : "failed",
      message: `${anySuccessFul && successSnippet} ${
        anyFailed && failedSnippet
      }`,
      data: successfulResults,
      error: bulkErrors.length > 0 ? bulkErrors.join(", ") : null,
    };

    return res.status(successfulResults.length > 0 ? 201 : 400).json(response);
  } catch (error) {
    return res.status(500).json(new ErrorResponse({ message: error.message }));
  }
};

const editPickUp = async (req, res) => {
  const errors = validators.createPickUpValidator.validate(req.body);
  if (errors.length > 0) {
    console.log(errors)
    return res
      .status(400)
      .json(new ErrorResponse({ message: errors.join(", ") }));
  }
  try {
    console.log(req.body)
    const retVal = await pickUpService.editPickUp(req.body);
    if (retVal === null) {
      return res
        .status(400)
        .json(new ErrorResponse({ message: "Failed to edit pick up point" }));
    }
    return res.status(200).json(
      new SuccessResponse({
        data: retVal,
        message: "Pick Up Point updated Successfully",
      })
    );
  } catch (error) {
    console.log(error.message)
    return res.status(500).json(new ErrorResponse({ message: error.message }));
  }
};

const getPickUp = async (req, res) => {
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

const getPickUpPoints = async (req, res) => {
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

const deletePickUp = async (req, res) => {
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
  addBulkPickups,
};
