const pool = require('./config/dbConfig');

const createTables = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS brms.locations(
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        landmark TEXT NOT NULL,
        description TEXT NOT NULL,
        city TEXT NOT NULL,
        lcda TEXT NOT NULL,
        area TEXT NOT NULL
      )`);

    await pool.query(
      `CREATE TYPE status AS ENUM ('active', 'suspended', 'inactive')`
    );

    await pool.query(`CREATE TABLE IF NOT EXISTS brms.pickuppoints(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        "busStop" TEXT NOT NULL,
        "locationId" TEXT REFERENCES brms.locations(id),
        code TEXT NOT NULL,
        status status
      )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS brms.routes(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL
      )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS brms.route_pickuppoints(
        route_id TEXT REFERENCES brms.routes(id),
        pickuppoint_id TEXT REFERENCES brms.pickuppoints(id)
      )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS brms.passengers(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phonenumber TEXT NOT NULL UNIQUE,
        pickuppoint TEXT REFERENCES brms.pickuppoints(id)
      )`);

    console.log("Tables created successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = createTables;