const pool = require("../config/dbConfig");
const { UNIQUE_VIOLATION_CODE, FOREIGN_KEY_VIOLATION_CODE } = require("../lib/constants");
const { generateUniqueId, convertToCamelCase } = require("../lib/utils");


async function addRoute(route) {
  try {
    const routeQuery = `
      INSERT INTO 
        brms.routes
          (id, name, description, title, lcda, start_point_id, end_point_id) 
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `;
    const routeValues = [
      generateUniqueId(),
      route.name,
      route.description,
      route.title ?? route.name,
      route.lcda,
      route.startPointId,
      route.endPointId,
    ];
    const { rows } = await pool.query(routeQuery, routeValues);
    const insertedRoute = convertToCamelCase(rows[0]);

    // Assuming the pickup points are provided in an array in the 'route.pickupPoints' property
    if (route.pickupPoints && Array.isArray(route.pickupPoints)) {
      const routePickupPointsQuery =
        'INSERT INTO brms.route_pickuppoints("route_id", "pickuppoint_id") VALUES ($1, $2)';
      for (const pickupPoint of route.pickupPoints) {
        const routePickupPointsValues = [
          insertedRoute.id,
          pickupPoint.pickuppoint_id,
        ];
        await pool.query(routePickupPointsQuery, routePickupPointsValues);
      }
    }

    return insertedRoute;
  } catch (error) {
    if (error.code === UNIQUE_VIOLATION_CODE) {
      throw new Error("A route with the same name already exists");
    } else if (error.code === FOREIGN_KEY_VIOLATION_CODE) {
      throw new Error("Either the start or end pickup points do not exist");
    }

    throw new Error("Failed to add a new route");
  }
}

async function getRoutes() {
  try {
    const query = "SELECT * FROM brms.routes";
    const { rows } = await pool.query(query);
    return rows.map(convertToCamelCase);
  } catch (error) {
    throw new Error("Failed to get routes");
  }
}

async function deleteRoute(routeId) {
  try {
    const query = 'DELETE FROM brms.routes WHERE "id" = $1 RETURNING *';
    const values = [routeId];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) return null;
    return convertToCamelCase(rows[0]);
    return rows[0];
  } catch (error) {
    throw new Error("Failed to delete route");
  }
}

async function editRoute(route) {
  try {
    const query =
      'UPDATE brms.routes SET "name" = $1, "description" = $2, "title" = $3, "lcda" = $4, "startPoint" = $5, "endPoint" = $6 WHERE "id" = $7 RETURNING "id"';
    const values = [
      route.name,
      route.description,
      route.title,
      route.lcda,
      route.startPoint,
      route.endPoint,
      route.id,
    ];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) return null;
    return convertToCamelCase(rows[0]);
  } catch (error) {
    throw new Error("Failed to edit route");
  }
}

async function mapPickupPointsToRoute(routeId, pickupPoints) {
  try {
    const checkPickupPointsQuery = `
      SELECT id
      FROM brms.pickup_points
      WHERE id = ANY ($1::int[]);
    `;
    const checkPickupPointsValues = [pickupPoints];
    const { rows: pickuppoints } = await pool.query(
      checkPickupPointsQuery,
      checkPickupPointsValues
    );
    if (pickupPoints.length !== pickuppoints.length) {
      throw new Error("One or more pickup points do not exist");
    }

    const mapQuery = `
      INSERT INTO brms.route_pickup_points (route_id, pickup_point_id)
      VALUES ${pickuppoints
        .map((_, index) => `($1, $${index + 2})`)
        .join(", ")};
    `;
    const mapValues = [routeId, ...pickuppoints];
    const { rows } = await pool.query(mapQuery, mapValues);
    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to map pickup points to route");
  }
}

module.exports = { addRoute, getRoutes, deleteRoute, editRoute, mapPickupPointsToRoute };
