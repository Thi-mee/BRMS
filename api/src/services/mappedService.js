const pool = require("../config/dbConfig");
const { convertToCamelCase } = require("../lib/utils");

async function mapPickupPointsToRoute(route_id, pickuppoints) {
  const checkPickupPointsQuery = `
    SELECT id
    FROM brms.pickuppoints
    WHERE id = ANY ($1::text[]);
  `;
  const checkPickupPointsValues = [pickuppoints];
  const { rows: pickupPoints } = await pool.query(
    checkPickupPointsQuery,
    checkPickupPointsValues
  );
  if (pickupPoints.length !== pickuppoints.length) {
    throw new Error("One or more pickup points do not exist");
  }

  try {
    const mapQuery = `
      INSERT INTO brms.route_pickuppoints (route_id, pickuppoint_id)
      VALUES ${pickupPoints.map((_, index) => `($1, $${index + 2})`).join(", ")}
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

module.exports = { mapPickupPointsToRoute };
