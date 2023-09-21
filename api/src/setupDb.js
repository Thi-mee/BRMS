const pool = require("./config/dbConfig");
const process = require("node:process");
const {TYPES, TABLES} = require("./utils/constants");
const logger = require("./utils/logger");


const createTables = async () => {
  logger.info("Creating tables... in schema", process.env.DB_SCHEMA);
  try {
    await pool.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.DB_SCHEMA}`);
    await pool.query(
      `CREATE TYPE ${TYPES.STATUS} AS ENUM ('active', 'suspended', 'inactive')`
    );
    await pool.query(
      `CREATE TYPE ${TYPES.LCDA} AS ENUM ('igbogboBaiyeku', 'ijede', 'ikoroduNorth', 'ikoroduWest', 'imota')`
    );

    await pool.query(`CREATE TABLE IF NOT EXISTS ${TABLES.LOCATION}(
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL UNIQUE,
        landmark TEXT NOT NULL,
        description TEXT NOT NULL,
        city TEXT NOT NULL,
        lcda ${TYPES.LCDA} NOT NULL,
        area TEXT NOT NULL
      )`);
    logger.info("Location table created successfully");


    await pool.query(`CREATE TABLE IF NOT EXISTS ${TABLES.PICKUP_POINT}(
        id TEXT PRIMARY KEY,
        location_id TEXT REFERENCES ${TABLES.LOCATION}(id),
        name TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        bus_stop TEXT NOT NULL,
        code TEXT NOT NULL,
        status ${TYPES.STATUS} NOT NULL,
        start_or_end BOOLEAN NOT NULL
      )`);
    logger.info("Pickup point table created successfully");

    await pool.query(`CREATE TABLE IF NOT EXISTS ${TABLES.ROUTE}(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL,
        title TEXT NOT NULL,
        lcda TEXT NOT NULL,
        start_point_id TEXT REFERENCES ${TABLES.PICKUP_POINT}(id),
        end_point_id TEXT REFERENCES ${TABLES.PICKUP_POINT}(id)
      )`);
    logger.info("Route table created successfully");

    await pool.query(`CREATE TABLE IF NOT EXISTS ${TABLES.ROUTE_PICKUP_POINT}(
        route_id TEXT REFERENCES ${TABLES.ROUTE}(id),
        pickup_point_id TEXT REFERENCES ${TABLES.PICKUP_POINT}(id)
      )`);
    logger.info("Route pickup point table created successfully");

    await pool.query(`CREATE TABLE IF NOT EXISTS ${TABLES.ROUTE_SCHEDULE}(
        id TEXT PRIMARY KEY,
        route_id TEXT REFERENCES ${TABLES.ROUTE}(id),
        pickup_point_id TEXT REFERENCES ${TABLES.PICKUP_POINT}(id),
        time TEXT NOT NULL,
        status status
      )`);
    logger.info("Route schedule table created successfully");

    // await pool.query(`CREATE TABLE IF NOT EXISTS passengers(
    //     id TEXT PRIMARY KEY,
    //     name TEXT NOT NULL,
    //     email TEXT NOT NULL UNIQUE,
    //     phone_number TEXT NOT NULL UNIQUE,
    //     pickup_point TEXT REFERENCES pickup_points(id)
    //   )`);

    logger.info("Tables created successfully");
  } catch (error) {
    console.log(error);
    // logger.error(error);
  }
};

const dropTables = async () => {
  try {
    // await pool.query(`DROP TABLE IF EXISTS passengers`);
    await pool.query(`DROP TABLE IF EXISTS ${TABLES.ROUTE_SCHEDULE}`);
    logger.info("Route schedule table dropped successfully");
    await pool.query(`DROP TABLE IF EXISTS ${TABLES.ROUTE_PICKUP_POINT}`);
    logger.info("Route pickup point table dropped successfully");
    await pool.query(`DROP TABLE IF EXISTS ${TABLES.ROUTE}`);
    logger.info("Route table dropped successfully");
    await pool.query(`DROP TABLE IF EXISTS ${TABLES.PICKUP_POINT}`);
    logger.info("Pickup point table dropped successfully");
    await pool.query(`DROP TABLE IF EXISTS ${TABLES.LOCATION}`);
    logger.info("Location table dropped successfully");
    await pool.query(`DROP TYPE IF EXISTS ${TYPES.LCDA}`);
    logger.info("LCDA type dropped successfully");
    await pool.query(`DROP TYPE IF EXISTS ${TYPES.STATUS}`);
    logger.info("Status type dropped successfully");
    logger.info("Tables dropped successfully");
  } catch (error) {
    console.log(error);
  }
};

const syncDatabase = async () => {
  const command = process.argv[2];
  if (command === "up") {
    await createTables();
    process.exit();
  } else if (command === "down") {
    await dropTables();
    process.exit();
  }
};

syncDatabase();
