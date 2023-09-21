const pool = require("../config/dbConfig");
const logger = require("../utils/logger");
const {generateUniqueId} = require("../utils/helper");
const {throwApplicationError} = require("../middlewares/errorHandler");
const {PICKUP_POINT} = require("../utils/constants").TABLES;


class PickupPointModel {
  constructor({pool}) {
    this.pool = pool;
  }

  /**
   * Get all pickup points
   * @returns {Promise<PickupPointObjDto[]>}
   */
  async findAll() {
    try {
      const query = `
        SELECT 
          *
        FROM 
          ${PICKUP_POINT}
      `;
      const {rows} = await this.pool.query(query);
      return rows;
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to get pickup points");
    }
  }


  async findById(id) {
    try {
      const query = `
        SELECT 
          *
        FROM 
          ${PICKUP_POINT}
        WHERE 
          id = $1
      `;
      const {rows} = await this.pool.query(query, [id]);
      if (rows.length === 0) return null;
      return rows[0];
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to get pickup points");
    }
  }

  async findByName(name) {
    try {
      const query = `
        SELECT 
          *
        FROM 
          ${PICKUP_POINT}
        WHERE 
          name = $1
      `;
      const {rows} = await this.pool.query(query, [name]);
      return rows[0];
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to get pickup points");
    }
  }

  async create(pickupPoint) {
    const pickupPointObj = {
      ...pickupPoint,
      id: generateUniqueId(),
    };
    try {
      const query = `
        INSERT INTO
          ${PICKUP_POINT}
          (id, name, title, description, bus_stop, code, status, start_or_end, location_id)
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *;
      `;
      const values = [
        pickupPointObj.id,
        pickupPointObj.name,
        pickupPointObj.title,
        pickupPointObj.description,
        pickupPointObj.busStop,
        pickupPointObj.code,
        pickupPointObj.status,
        pickupPointObj.startOrEnd,
        pickupPointObj.locationId,
      ];
      const {rows} = await this.pool.query(query, values);
      return rows[0];
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to add new pickup");
    }
  }

  async update(pickupPoint) {
    try {
      const query = `
        UPDATE 
          ${PICKUP_POINT}
        SET 
          name = $1, 
          title = $2, 
          description = $3, 
          bus_stop = $4, 
          code = $5, 
          status = $6, 
          start_or_end = $7, 
          location_id = $8
        WHERE 
          id = $9
        RETURNING *;
      `;
      const values = [
        pickupPoint.name,
        pickupPoint.title,
        pickupPoint.description,
        pickupPoint.busStop,
        pickupPoint.code,
        pickupPoint.status,
        pickupPoint.startOrEnd,
        pickupPoint.locationId,
        pickupPoint.id,
      ];
      const {rows} = await this.pool.query(query, values);
      if (rows.length === 0) throwApplicationError(500, "Failed to update pickup")
      return rows[0];
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to update pickup");
    }
  }

  async delete(id) {
    try {
      const query = `
        DELETE FROM 
          ${PICKUP_POINT}
        WHERE 
          id = $1
        RETURNING *;
      `;
      const values = [id];
      const {rows} = await this.pool.query(query, values);
      return rows[0];
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to delete pickup");
    }
  }

  async verifyPickupPoints(pickupPointIds) {
      try {
      const query = `
        SELECT 
          id
        FROM 
          ${PICKUP_POINT}
        WHERE 
          id = ANY ($1::text[]);
      `;
      const {rows} = await this.pool.query(query, [pickupPointIds]);
      return rows.length === pickupPointIds.length;
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to verify pickup points");
    } }
}

/**
 * @typedef {Object} PickupPointObj
 * @property {string?} id
 * @property {string} name
 * @property {string} title
 * @property {string} description
 * @property {string} busStop
 * @property {string} code
 * @property {string} status
 * @property {boolean} startOrEnd
 * @property {string} locationId
 */

/**
 * @typedef {Object} PickupPointObjDto
 * @property {string} id
 * @property {string} name
 * @property {string} title
 * @property {string} description
 * @property {string} busStop
 * @property {string} code
 * @property {string} status
 * @property {boolean} startOrEnd
 * @property {string} locationId
 */

const PickupPoint = new PickupPointModel({pool});

module.exports = PickupPoint;