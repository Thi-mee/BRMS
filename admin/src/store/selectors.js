export const getAllPickUps = (state) =>  state.pickup.pickuppoints;
export const getAllPickUpsStatus = (state) => state.pickup.status;
export const getAllPickUpError = (state) => state.pickup.error;

export const getAllLocations = (state) => state.locations.locations;
export const getLocationStatus = (state) => state.locations.status;
export const getLocationError = (state) => state.locations.error;

export const getLocationsData = (state) => state.locations;