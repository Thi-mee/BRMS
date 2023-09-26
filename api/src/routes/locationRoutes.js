const router = require("express").Router();
const locationController = require("../controllers/locationController");
const { locationValidate } = require("../middlewares/validationMiddleware");

router.get("/", locationController.getLocations);
router.put("/:id", locationValidate, locationController.editLocation);
router.delete("/:locationId", locationController.deleteLocation);
router.post("/", locationValidate, locationController.addLocation);

module.exports = router;
