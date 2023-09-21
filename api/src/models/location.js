const pool = require("../config/dbConfig");
const logger = require("../utils/logger");
const {generateUniqueId} = require("../utils/helper");
const {LOCATION, PICKUP_POINT} = require("../utils/constants").TABLES;


class LocationModel {
  constructor({pool}) {
    this.pool = pool;
  }

  /**
   * Get a location by id
   * @param {string} id
   * @returns {Promise<LocationObjDto|null>}
   */
  async findById(id) {
    try {
      const query = `
        SELECT 
          *, EXISTS (SELECT 1 FROM ${PICKUP_POINT} WHERE location_id = id) AS referenced
        FROM 
          ${LOCATION} 
        WHERE 
          id = $1
      `;
      const values = [id];
      const {rows} = await this.pool.query(query, values);
      if (rows.length === 0) return null;
      return rows[0];
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to get location");
    }
  }

  /**
   * Get a location by title
   * @param {string} title
   * @returns {Promise<LocationObjDto|null>}
   */
  async findByTitle(title) {
    try {
      const query = `
        SELECT 
          *, EXISTS (SELECT 1 FROM ${PICKUP_POINT} WHERE location_id = id) AS referenced
        FROM 
          ${LOCATION} 
        WHERE 
          title = $1
      `;
      const values = [title];
      const {rows} = await this.pool.query(query, values);
      if (rows.length === 0) return null;
      return rows[0];
    } catch (error) {
      throw new Error("Failed to get location");
    }
  }

  /**
   * Create a new location
   * @param {LocationObj} location
   * @returns {Promise<LocationObjDto>}
   */
  async create(location) {
    try {
      const query = `
        INSERT INTO 
          ${LOCATION} 
          ("id", "title", "description", "landmark", "lcda", "city", "area")
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING 
          *, false AS referenced;
      `;
      const values = [
        generateUniqueId(),
        location.title,
        location.description,
        location.landmark,
        location.lcda,
        location.city,
        location.area,
      ];
      const {rows} = await this.pool.query(query, values);
      return rows[0];
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to create a new location");
    }
  }

  /**
   * update a location by id
   * @param {LocationObj} location
   * @returns {Promise<LocationObjDto>}
   */
  async updateById(location) {
    try {
      const query = `
        UPDATE 
          ${LOCATION} 
        SET 
          description = $1, 
          landmark = $2, 
        WHERE 
          id = $3
        RETURNING 
          *, EXISTS (SELECT 1 FROM ${PICKUP_POINT} WHERE location_id = $1) AS referenced;
      `;
      const values = [
        location.description,
        location.landmark,
        location.id,
      ];
      const {rows} = await this.pool.query(query, values);
      return rows[0];
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to update location");
    }
  }

  /**
   * Get all locations
   * @returns {Promise<LocationObjDto[]>}
   */
  async findAll() {
    try {
      const query = `
        SELECT 
          *, EXISTS (SELECT 1 FROM ${PICKUP_POINT} WHERE location_id = id) AS referenced
        FROM 
          ${LOCATION}
      `;
      const {rows} = await this.pool.query(query);
      return rows;
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to get locations");
    }
  }

  /**
   * Delete a location by id
   * @param {string} id
   * @returns {Promise<LocationObjDto>}
   */
  async deleteById(id) {
    try {
      const query = `
        DELETE FROM 
          ${LOCATION} 
        WHERE 
          id = $1 
        RETURNING 
          *;
      `;
      const values = [id];
      const {rows} = await this.pool.query(query, values);
      return rows[0];
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to delete location");
    }
  }
}


/**
 * @typedef {Object} LocationObj
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} landmark
 * @property {string} lcda
 * @property {string} city
 * @property {string} area
 */

/**
 * @typedef {Object} LocationObjDto
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} landmark
 * @property {string} lcda
 * @property {string} city
 * @property {string} area
 * @property {boolean} referenced
 */


const Location = new LocationModel({pool})

module.exports = Location;