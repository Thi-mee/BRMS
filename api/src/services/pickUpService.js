const { generateCode, convertToCamelCase } = require("../utils/helper");
const { UNIQUE_VIOLATION_CODE } = require("../lib/constants");
const Location = require("../models/location");
const PickupPoint = require("../models/pickup_point");
const {throwApplicationError} = require("../middlewares/errorHandler");

async function addPickUp(pickup) {

  const existingPickup = await PickupPoint.findByName(pickup.name);
  if (existingPickup) {
    throw new Error("A pickup point with that name already exists");
  }
  const location = await Location.findById(pickup.locationId)
  if (!location) {
    throw new Error("Location with the provided ID not found");
  }

  try {
    const newPickupPoint = await PickupPoint.create({
      ...pickup,
      code: generateCode(pickup.name),
      title: !!pickup.title ? pickup.title : pickup.name,
    });
    return convertToCamelCase(newPickupPoint);
  } catch (error) {
    console.log(error);
    if (error.code === UNIQUE_VIOLATION_CODE) {
      throw new Error("A pickup point with that name already exists");
    }
    throw new Error("Failed to add new pickup");
  }
}

async function deletePickUp(pickUpId) {
  try {
    const deletedPickup = await PickupPoint.delete(pickUpId);
    return convertToCamelCase(deletedPickup);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete pickup");
  }
}

async function editPickUp(pickUp) {
  try {
<<<<<<< HEAD
    const query =
      'UPDATE brms.pickuppoints SET "name" = $1, "location_id" = $2, "title" = $3, "description" = $4, "bus_stop" = $5, "code" = $6, "status" = $7 WHERE "id" = $8 RETURNING *';
    const values = [
      pickUp.name,
      pickUp.locationId,
      pickUp.title,
      pickUp.description,
      pickUp.busStop,
      pickUp.code,
      pickUp.status,
      pickUp.id,
    ];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) return null;
    console.log(rows)
    return convertToCamelCase(rows[0]);
=======
    const updatedPickup = await PickupPoint.update(pickUp);
    return convertToCamelCase(updatedPickup);
>>>>>>> 501b8c67f727b5e77e7ac9f2beeb8760fca989de
  } catch (error) {
    console.log(error);
    throw new Error("Failed to edit pick up");
  }
}

async function getPickUp(id) {
  try {
    const pickup = await PickupPoint.findById(id);
    if (!pickup) {
      throwApplicationError(404,"Pick up not found");
    }
    return convertToCamelCase(pickup);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get pickup");
  }
}

async function getPickUpPoints() {
  try {
    const pickups = await PickupPoint.findAll();
    return pickups.map(convertToCamelCase);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get pick up points");
  }
}

module.exports = {
  getPickUpPoints,
  getPickUp,
  editPickUp,
  deletePickUp,
  addPickUp,
};

// pickup is a string
