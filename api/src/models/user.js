const pool = require("../config/dbConfig");
const logger = require("../utils/logger");
const {generateUniqueId} = require("../utils/helper");
const {USER} = require("../utils/constants").TABLES;


class UserModel {
  constructor({pool}) {
    this.pool = pool;
  }

  /**
   * Get all users
   * @returns {Promise<UserObjDto[]>}
   * @throws {Error}
   */
  async findAll() {
    try {
      const query = `
        SELECT 
          *
        FROM 
          ${USER}
      `;
      const {rows} = await this.pool.query(query);
      return rows;
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to get users");
    }
  }

  /**
   * Get a user by id
   * @param {string} id
   * @returns {Promise<UserObjDto|null>}
   * @throws {Error}
   */
  async findById(id) {
    try {
      const query = `
        SELECT 
          *
        FROM 
          ${USER} 
        WHERE 
          id = $1
      `;
      const values = [id];
      const {rows} = await this.pool.query(query, values);
      if (rows.length === 0) return null;
      return rows[0];
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to get user");
    }
  }

  /**
   * Get a user by params
   * @param {string} email
   * @returns {Promise<UserObjDto|null>}
   * @throws {Error}
   */
  async findByEmail(email) {
    try {
      const query = `
        SELECT 
          *
        FROM 
          ${USER} 
        WHERE 
          email = $1
      `;
      const values = [email];
      const {rows} = await this.pool.query(query, values);
      if (rows.length === 0) return null;
      return rows[0];
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to get user");
    }
  }

  /**
   * Create a new user
   * @param {UserObj} user
   * @returns {Promise<UserObjDto>}
   * @throws {Error}
   */
  async create(user) {
    try {
      const query = `
        INSERT INTO ${USER} (id, fullname, email, hashed_password) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
      `;
      const values = [generateUniqueId(), user.fullname, user.email, user.hashed_password];
      const {rows} = await this.pool.query(query, values);
      if (rows.length === 0) return null;
      return rows[0];
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to create user");
    }
  }

  /**
   * Update a user
   * @param {UserObj} user
   * @returns {Promise<UserObjDto>}
   */
  async update(user) {
    try {
      const query = `
        UPDATE ${USER} 
        SET fullname = $1, email = $2, hashed_password = $3
        WHERE id = $4
        RETURNING *
      `;
      const values = [user.fullname, user.email, user.hashed_password, user.id];
      const {rows} = await this.pool.query(query, values);
      if (rows.length === 0) return null;
      return rows[0];
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to update user");
    }
  }

  /**
   * Delete a user
   * @param {string} id
   * @returns {Promise<UserObjDto>}
   */
  async delete(id) {
    try {
      const query = `
        DELETE FROM ${USER} 
        WHERE id = $1
        RETURNING *
      `;
      const values = [id];
      const {rows} = await this.pool.query(query, values);
      if (rows.length === 0) return null;
      return rows[0];
    } catch (error) {
      logger.error(error.message || error);
      throw new Error("Failed to delete user");
    }
  }
}

/**
 * @typedef {Object} UserObj
 * @property {string?} id
 * @property {string} fullname
 * @property {string} email
 * @property {string} hashed_password
 */

/**
 * @typedef {Object} UserObjDto
 * @property {string} id
 * @property {string} fullname
 * @property {string} email
 * @property {string} hashed_password
 */


const userModel = new UserModel({pool});

module.exports = userModel;