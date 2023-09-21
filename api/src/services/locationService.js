const Location = require("../models/location");
const { NOT_ENUM_VALUE } = require("../lib/constants");

async function createLocation(location) {
  const existingLocation = await Location.findByTitle(location.title)
  if (existingLocation) {
    throw new Error("Location with the provided title already exists");
  }
  try {
    return await Location.create(location);
  } catch (error) {
    if (error.code ===  NOT_ENUM_VALUE) {
      throw new Error("Thats not a registered lcda")
    }
    console.log(error);
    throw new Error("Failed to create a new location");
  }
}

async function getLocations(tableName = "brms.locations") {
  try {
    return await Location.findAll()
  } catch (error) {
    throw new Error("Failed to get locations");
  }
}

async function editLocation(location) {
  const existingLocation = await Location.findById(location.id)
  if (!existingLocation) {
    throw new Error("Location does not exist");
  }
  const existingLocationWithSameTitle = await Location.findByTitle(location.title)
  if (existingLocationWithSameTitle && existingLocationWithSameTitle.id !== location.id) {
    throw new Error("Location with the provided title already exists");
  }
  try {
    return await Location.updateById(location)
  } catch (error) {
    throw new Error("Failed to edit location");
  }
}

async function deleteLocation(locationId) {
  const existingLocation = await Location.findById(locationId)
  if (!existingLocation) {
    throw new Error("Location does not exist");
  }
  if (existingLocation.referenced) {
    throw new Error("Location is in use");
  }
  try {
    return await Location.deleteById(locationId)
  } catch (error) {
    if (error.code === "23503") {
      throw new Error("Location is in use");
    }
    throw new Error("Failed to delete location");
  }
}


module.exports = {
  createLocation,
  getLocations,
  editLocation,
  deleteLocation,
};
