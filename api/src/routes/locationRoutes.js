const router = require('express').Router();
const locationController = require('../controllers/locationController');

router.get('/', locationController.getLocations);
router.put('/', locationController.editLocation);
router.delete('/:locationId', locationController.deleteLocation);

module.exports = router;