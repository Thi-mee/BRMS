const router = require("express").Router();
const pickUpController = require("../controllers/pickUpController");
const {
  pickupValidate,
  pickupIdPValidate,
} = require("../middlewares/validationMiddleware");

router.post("/", pickupValidate, pickUpController.addPickUp);
router.post("/bulk", pickUpController.addBulkPickups);
router.get("/:id", pickUpController.getPickUp);
router.get("/", pickUpController.getPickUpPoints);
router.put(
  "/:id",
  pickupIdPValidate,
  pickupValidate,
  pickUpController.editPickUp
);
router.delete("/:id", pickUpController.deletePickUp);

module.exports = router;
