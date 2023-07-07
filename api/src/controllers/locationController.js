const { ErrorResponse, SuccessResponse } = require('../lib/location');
const { locationValidator } = require('../lib/validationRules');
const locationService = require('../services/locationService');

const getLocations = async (req, res, next) => {
    try{
        const retVal = await locationService.getLocations();
        if(retVal === null) return res.status(400).json(new ErrorResponse({ message: 'Failed to get locations'}))
        return res.status(200).json(new SuccessResponse({ data: retVal }))
    } catch(error){
        console.log(error)
        return res.status(500).json(new ErrorResponse({ message: 'Failed to get locations'}));
    }
}

const editLocation = async (req, res, next) => {
    const errors = locationValidator.validate(req.body);
    if(errors.length > 0){
        return res.status(400).json(new ErrorResponse({ message: errors.join(', ')}));
    }
    try{
        const retVal = await locationService.editLocation(req.body);
        if(retVal === null){
            return res.status(400).json(new ErrorResponse({ message: 'Failed to edit location'}));
        }
        return res.status(200).json(new SuccessResponse({ data: retVal, message: 'Location edited successfully'}));
    } catch(error){
        console.log(error);

    }
}

module.exports = {
    getLocations,
    editLocation
}