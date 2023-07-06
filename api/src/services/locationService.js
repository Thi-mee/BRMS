const pool = require("../config/dbConfig");

async function createLocation(location) {
  try {
    const query =
      "INSERT INTO brms.locations (id, title, lcda, city, area, description, landmark) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const value = [
      location.id,
      location.title,
      location.lcda,
      location.city,
      location.area,
      location.description,
      location.landmark,
    ];
    const { rows } = await pool.query(query, value);
    if (rows.length === 0) return null;
    return rows[0].id;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create a new location");
  }
}

async function getLocations() {
  try {
    const query = 'SELECT * FROM location ORDER BY "id" ASC';
    const { rows } = await pool.query(query);
    if (rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    throw new Error("Failed to get locations");
  }
}

async function editLocation(location) {
  try {
    const query =
      'UPDATE brms.locations SET "title" = $1, "lcda" = $2, "city" = $3, "area" = $4, "description" = $5, "landmark" = $6 WHERE "id" = $7 RETURNING "id"';
    const values = [
      location.title,
      location.lcda,
      location.city,
      location.area,
      location.description,
      location.landmark,
      location.id,
    ];
    const { rows } = await pool.query(query, values);
    console.log(rows);
    if (rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to edit location");
  }
}

module.exports = {
  createLocation,
  getLocations,
  editLocation,
};

// I need to edit location,
// I will check if there is a location id, if there is a location id, I will edit the location, and send it to the database,
