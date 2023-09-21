const pool = require("../config/dbConfig");
const { convertToCamelCase } = require("../utils/helper");
const { ROUTE_SCHEDULE } = require("../utils/constants").TABLES;
const PickupPoint = require("../models/pickup_point");
const {throwApplicationError} = require("../middlewares/errorHandler");


// Controller to schedule a route
// const scheduleRoute = async (req, res) => {
//   try {
//     const routeId = req.params.routeId;
//     const { schedule } = req.body; // Assuming schedule is an array of objects with pick-up point IDs and corresponding arrival and departure times

//     // Perform any necessary validation on the request body before proceeding

//     // Ensure all the given pick-up points exist in the database before proceeding
//     const pickupPointIds = schedule.map((entry) => entry.pickupPointId);
//     const checkPickupPointsQuery = `
//       SELECT id
//       FROM brms.pickup_points
//       WHERE id = ANY ($1::int[]);
//     `;
//     const pickupPointsResult = await pool.query(checkPickupPointsQuery, [
//       pickupPointIds,
//     ]);

//     if (pickupPointsResult.rows.length !== pickupPointIds.length) {
//       return res
//         .status(404)
//         .json({ error: "One or more pick-up points do not exist." });
//     }

//     // Schedule the pick-up points for the route by inserting records into the route_schedule table
//     const scheduleQuery = `
//       INSERT INTO brms.route_schedule (route_id, pickup_point_id, arrival_time, departure_time)
//       VALUES ${schedule
//         .map(
//           (entry, index) =>
//             `($1, $${index * 3 + 2}, $${index * 3 + 3}, $${index * 3 + 4})`
//         )
//         .join(", ")};
//     `;

//     const scheduleValues = [];
//     schedule.forEach((entry) => {
//       scheduleValues.push(
//         routeId,
//         entry.pickupPointId,
//         entry.arrivalTime,
//         entry.departureTime
//       );
//     });

//     await pool.query(scheduleQuery, scheduleValues);

//     res.json({ message: "Route scheduled successfully." });
//   } catch (error) {
//     console.error("Error scheduling route:", error);
//     res.status(500).json({ error: "Failed to schedule route." });
//   }
// };

async function scheduleRoute(route_id, schedule) {
  const pickupPointIds = schedule.map((entry) => entry.pickuppoint_id);
  const allPickupExists = await PickupPoint.verifyPickupPoints(pickupPointIds);
  if (!allPickupExists) {
    throwApplicationError(404, "One or more pick-up points do not exist.")
  }
  try {
    const scheduleQuery = `
        INSERT INTO ${ROUTE_SCHEDULE} (route_id, pickuppoint_id, arrival_time, departure_time, service)
        VALUES ${schedule
          .map(
            (entry, index) =>
              `($1, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4}, $${
                index * 4 + 5
              })`
          )
          .join(", ")} RETURNING *;
      `;
      
      const scheduleValues = [];
      schedule.forEach((entry) => {
        scheduleValues.push(
          route_id,
          entry.pickuppoint_id,
          entry.arrival_time,
          entry.departure_time,
          entry.service
          );
        });

        
    const {rows}  = await pool.query(scheduleQuery, scheduleValues);
    console.log(rows)
    return rows.map(convertToCamelCase);

  } catch (error) {
    console.error("Error scheduling route:", error);
    throw new Error("Failed to schedule route.");
  }
}

module.exports = { scheduleRoute };
