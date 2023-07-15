const pool = require("../config/dbConfig");

async function addPickUp(pickUp) {
  try {
    const query =
      'INSERT INTO brms.pickuppoints (id, name, title, description, "busStop", code, status, "locationId") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const values = [
      pickUp.id,
      pickUp.name,
      pickUp.title,
      pickUp.description,
      pickUp.busStop,
      pickUp.code,
      pickUp.status,
      pickUp.locationId,
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    if (error.code === "42703") {
      throw new Error("Location isn't valid");
    }
    if (error.code === "23505") {
      throw new Error("Pick up point already exists");
    }
    if (error.code === "23503") {
      throw new Error("Location doesn't exist");
    }
    if (error.code === "22P02") {
      throw new Error("Location isn't valid");
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
    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete pickup");
  }
}

async function editPickUp(pickUp) {
  try {
    const query =
      'UPDATE brms.pickuppoints SET "name" = $1, "locationId" = $2, "title" = $3, "description" = $4, "busStop" = $5, "code" = $6, "status" = $7 WHERE "id" = $8 RETURNING "id"';
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
    return rows[0];
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
    console.log(rows);
    if (rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get pickup");
  }
}

async function getPickUpPoints() {
  try {
    const query = 'SELECT * FROM brms.pickuppoints ORDER BY "id" ASC';
    const { rows } = await pool.query(query);
    return rows;
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
