const pool = require("../config/dbConfig");
const { convertToCamelCase } = require("../utils/helper");
const PickupPoint = require("../models/pickup_point");
const { throwApplicationError } = require("../middlewares/errorHandler");
const { ROUTE_PICKUP_POINT } = require("../utils/constants").TABLES;

async function demapRoute(route_id) {
  try {
    const query = `
      DELETE FROM ${ROUTE_PICKUP_POINT}
      WHERE route_id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [route_id]);
    return rows.map(convertToCamelCase);
  } catch (error) {
    console.log(error);
    throwApplicationError(500, "Failed to delete route");
  }
}



async function mapPickupPointsToRoute(route_id, pickuppoints) {
  const isAllValid = await PickupPoint.verifyPickupPoints(pickuppoints);
  if (!isAllValid) {
    throw new Error("One or more pickup points is invalid");
  }
  await demapRoute(route_id);
  try {
    const mapQuery = `
      INSERT INTO brms.route_pickuppoints (route_id, pickuppoint_id)
      VALUES ${pickuppoints.map((_, index) => `($1, $${index + 2})`).join(", ")}
      RETURNING *;
    `;

    const mapValues = [route_id, ...pickuppoints];
    const { rows } = await pool.query(mapQuery, mapValues);
    return rows.map(convertToCamelCase);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add new route");
  }
}

async function getMappedRoutes(){
  try{
    const query = "SELECT * FROM brms.route_pickuppoints";
    const { rows } = await pool.query(query);
    return rows.map(convertToCamelCase);
  } catch (error){
    console.log(error);
    throw new Error("Failed to get mapped routes")
  }
}

module.exports = { mapPickupPointsToRoute, getMappedRoutes };
