
const router = require('express').Router();
const pickUpController = require('../controllers/pickUpController');

router.post('/', pickUpController.addPickUp);
router.post('/bulk', pickUpController.addBulkPickups);
router.get('/:id', pickUpController.getPickUp);
router.get('/', pickUpController.getPickUpPoints);
router.put('/:id', pickUpController.editPickUp);
router.delete('/:id', pickUpController.deletePickUp);

module.exports = router;