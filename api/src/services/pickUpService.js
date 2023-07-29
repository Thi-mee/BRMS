const pool = require("../config/dbConfig");
const { generateUniqueId, generateCode, convertToCamelCase } = require("../lib/utils");
const { UNIQUE_VIOLATION_CODE } = require("../lib/constants");

async function addPickUp(pickUp) {
  const pickupObj = {
    ...pickUp,
    id: generateUniqueId(),
    code: generateCode(pickUp.name),
    title: !!pickUp.title ? pickUp.title : pickUp.name,
  };

  {
    const { rows } = await pool.query(
      "SELECT * FROM brms.pickuppoints WHERE name = $1",
      [pickupObj.name]
    );
    if (rows.length > 0) {
      throw new Error("A pickup point with that name already exists");
    }
  }
  {
    const { rows } = await pool.query(
      "SELECT * FROM brms.locations WHERE id = $1",
      [pickupObj.locationId]
    );
    if (rows.length === 0) {
      throw new Error("Location with the provided ID not found");
    }
  }
  try {
    const query = `
      INSERT INTO
        brms.pickuppoints 
        (id, name, title, description, bus_stop, code, status, start_or_end, location_id)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *;
    `;
    const values = [
      pickupObj.id,
      pickupObj.name,
      pickupObj.title,
      pickupObj.description,
      pickupObj.busStop,
      pickupObj.code,
      pickupObj.status,
      pickupObj.startOrEnd,
      pickupObj.locationId,
    ];
    const { rows } = await pool.query(query, values);
    return convertToCamelCase(rows[0]);
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
    const query = 'DELETE FROM brms.pickuppoints WHERE "id" = $1 RETURNING *';
    const values = [pickUpId];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) return null;
    return convertToCamelCase(rows[0]);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete pickup");
  }
}

async function editPickUp(pickUp) {
  try {
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
    return convertToCamelCase(rows[0]);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to edit pick up");
  }
}

async function getPickUp(id) {
  try {
    const query = 'SELECT * FROM brms.pickuppoints WHERE "id" = $1';
    const values = [id];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) return null;
    return convertToCamelCase(rows[0]);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get pickup");
  }
}

async function getPickUpPoints() {
  try {
    const query = 'SELECT * FROM brms.pickuppoints ORDER BY "id" ASC';
    const { rows } = await pool.query(query);
    return rows.map(convertToCamelCase);
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
