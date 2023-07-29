import { createSelector } from "@reduxjs/toolkit";

// Pickup selectors
export const getPickUpData = (state) => state.pickup;
export const getPickupFetchStatus = (state) => state.pickup.fetchStatus;

// Location selectors
export const getLocationData = (state) => state.locations;
export const getLocationFetchStatus = (state) => state.locations.fetchStatus;

export const getRoutesData = (state) => state.routes;
export const getRoutesFetchStatus = (state) => state.routes.fetchStatus;

export const validStartOrEndPoints = createSelector(
  getPickUpData,
  ({ pickuppoints }) => {
    return pickuppoints.filter((point) => point.startOrEnd);
  }
);

export const pickupPoints = createSelector(
  [getPickUpData, getLocationData],
  ({ pickuppoints }, { locations }) => {
    return pickuppoints.map((point) => {
      const location = locations.find((loc) => loc.id === point.locationId);
      return { ...point, location };
    });
  }
);
export const notStartOrEndPickupPoints = createSelector(
  [getPickUpData, getLocationData],
  ({ pickuppoints }, { locations }) => {
    return pickuppoints
      .filter((point) => !point.startOrEnd)

      .map((point) => {
        console.log(point);
        console.log(locations);
        const location = locations.find((loc) => loc.id === point.locationId);
        return { ...point, location };
      });
  }
);
