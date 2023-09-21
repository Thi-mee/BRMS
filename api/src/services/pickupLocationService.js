const pool = require("../config/dbConfig");
const { UNIQUE_VIOLATION_CODE } = require("../lib/constants");
const { generateUniqueId, generateCode } = require("../utils/helper");

/**
 * Creates a pickupPoint with a new location
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.title
 * @param {string} data.busStop
 * @param {string} data.description
 * @param {boolean} data.status
 * @param {boolean} data.startOrEnd
 * @param {Object} data.location
 * @param {string} data.location.title
 * @param {string} data.location.lcda
 * @param {string} data.location.city
 * @param {string} data.location.area
 * @param {string} data.location.description
 * @param {string} data.location.landmark
 * @returns {Promise<void>}
 */
async function createLocationAndPickup(data) {

	const pickupPointData = {
		id: generateUniqueId(),
		name: data.name,
		title: data.title ?? data.name,
		busStop: data.busStop,
		code: generateCode(data.name),
		description: data.description,
		status: data.status ? 'active' : 'inactive',
		startOrEnd: data.startOrEnd
	}

	const client = await pool.connect()
	try {
		await client.query('BEGIN');

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
			data.location.title,
			data.location.lcda,
			data.location.city,
			data.location.area,
			data.location.description,
			data.location.landmark,
		];
		const { rows } = await client.query(query, value);
		const location = rows[0];

		const pickupPointQuery = `
			INSERT INTO
				brms.pickuppoints (id, name, title, bus_stop, code, description, status, start_or_end, location_id)
			VALUES
				($1, $2, $3, $4, $5, $6, $7, $8, $9)
			RETURNING
				*;
		`;
		const pickupPointValue = [
			pickupPointData.id,
			pickupPointData.name,
			pickupPointData.title,
			pickupPointData.busStop,
			pickupPointData.code,
			pickupPointData.description,
			pickupPointData.status,
			pickupPointData.startOrEnd,
			location.id
		];
		const { rows: pickupPointRows } = await client.query(pickupPointQuery, pickupPointValue);
		const pickupPoint = pickupPointRows[0];

		await client.query('COMMIT');
		return pickupPoint;
	} catch (e) {
		await client.query('ROLLBACK');

		if (e.code === UNIQUE_VIOLATION_CODE) {
			if (e.constraint === 'locations_title_key') {
				throw new Error('A Location with that title already exists');
			} else if (e.constraint === 'pickuppoints_name_key') {
				throw new Error('A Pickup Point with that name already exists');
			} else if (e.constraint === 'pickuppoints_code_key') {
				throw new Error('An error occurred while generating a unique code for the pickup point');
			}
		}
		else 
			throw new Error('An error occurred while creating a new pickup point');
	} finally {
		client.release();
	}
}


module.exports = { createLocationAndPickup }