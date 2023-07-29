const pool = require("../config/dbConfig");
const { NOT_ENUM_VALUE } = require("../lib/constants");
const {generateUniqueId, convertToCamelCase} = require("../lib/utils");

async function createLocation(location) {
  const {rows} = await pool.query(`SELECT * FROM brms.locations WHERE title = $1`, [location.title]);
  if (rows.length > 0) {
    throw new Error("Location with the provided title already exists");
  }


  try {
    const query = `
      INSERT INTO 
        brms.locations (id, title, lcda, city, area, description, landmark) 
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING 
        *, false AS is_referenced;
    `;
    const value = [
      generateUniqueId(),
      location.title,
      location.lcda,
      location.city,
      location.area,
      location.description,
      location.landmark,
    ];
    const { rows } = await pool.query(query, value);
    if (rows.length === 0) return null;
    return convertToCamelCase(rows[0]);
  } catch (error) {
    if (error.code =  NOT_ENUM_VALUE) {
      throw new Error("Thats not a registered lcda")
    }
    console.log(error);
    throw new Error("Failed to create a new location");
  }
}

async function getLocations(tableName = "brms.locations") {
  try {
    const query = `
      SELECT DISTINCT ON (locations.id) 
        locations.*, 
        COALESCE(pickuppoints.location_id IS NOT NULL, false) AS is_referenced
      FROM 
        ${tableName}
      LEFT JOIN 
        brms.pickuppoints ON pickuppoints.location_id = locations.id
      ORDER BY
        locations.id;
    `;
    const { rows } = await pool.query(query);
    return rows.map(convertToCamelCase);
  } catch (error) {
    throw new Error("Failed to get locations");
  }
}

async function editLocation(location) {
  const { rows } = await pool.query(`SELECT * FROM brms.locations WHERE title = $1`, [location.title]);
  if (rows.length !== 1) {
    throw new Error("Location with the provided title already exists");
  }
  try {
    const query = `
      UPDATE 
        brms.locations 
      SET 
        "description" = $1, "landmark" = $2 
      WHERE 
        "id" = $3 
      RETURNING 
        *, COALESCE((SELECT true FROM brms.pickuppoints WHERE location_id = $3), false) AS is_referenced;
    `;
      const values = [
      location.description,
      location.landmark,
      location.id,
    ];
    const { rows } = await pool.query(query, values);
    return convertToCamelCase(rows[0]);
  } catch (error) {

    throw new Error("Failed to edit location");
  }
}

async function deleteLocation(locationId) {
  try {
    const query = `
      DELETE FROM 
        brms.locations 
      WHERE "id" = $1 
      RETURNING *, COALESCE((SELECT true FROM brms.pickuppoints WHERE location_id = $1), false) AS is_referenced;
    `;
    const values = [locationId];
    const { rows } = await pool.query(query, values);
    return convertToCamelCase(rows[0]);
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
