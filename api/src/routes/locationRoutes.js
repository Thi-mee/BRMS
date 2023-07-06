const router = require('express').Router();
const locationController = require('../controllers/locationController');

router.get('/', locationController.getLocations);
router.put('/', locationController.editLocation);

module.exports = router;