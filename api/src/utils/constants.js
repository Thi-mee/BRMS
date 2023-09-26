require('dotenv').config();
const schema = process.env.DB_SCHEMA || 'public';

exports.TYPES = {
  STATUS: `${schema}.statuse`,
  LCDA: `${schema}.lcdas`
}
exports.TABLES = {
  LOCATION: `${schema}.locations`,
  PICKUP_POINT: `${schema}.pickuppoints`,
  ROUTE: `${schema}.routes`,
  ROUTE_PICKUP_POINT: `${schema}.route_pickuppoints`,
  ROUTE_SCHEDULE: `${schema}.route_schedules`,
  PASSENGER: `${schema}.passengers`
}

exports.PP_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
}

exports.LCDAS = [
  "igbogboBaiyeku",
  "ijede",
  "ikoroduNorth",
  "ikoroduWest",
  "imota",
];