const router = require('express').Router();
const locationController = require('../controllers/locationController');

router.get('/', locationController.getLocations);
router.put('/:id', locationController.editLocation);
router.delete('/:locationId', locationController.deleteLocation);
router.post('/', locationController.addLocation);

module.exports = router;