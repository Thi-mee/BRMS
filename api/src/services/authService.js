const { pool } = require('../config/dbConfig');

async function registerUser(userData) {
  try {
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
    const values = [userData.email, userData.password];
    const { rows } = await pool.query(query, values);
    if(rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    throw new Error('Failed to create a new user');
  }
}

async function loginUser(userData) {
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [userData.email];
    const { rows } = await pool.query(query, values);
    if(rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    throw new Error('Failed to login');
  }
}

async function getUser(email) {
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const { rows } = await pool.query(query, values);
    if(rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    throw new Error('Failed to get user');
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUser
};