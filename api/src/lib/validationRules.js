const { get } = require("../routes/authroute");
const Validator = require("./validator");

const validLcdas = [
  "igbogboBaiyeku",
  "ijede",
  "ikoroduNorth",
  "ikoroduWest",
  "imota",
];

const getIdValidation = (field, label) => ({
  field,
  validator: (value) =>
    typeof value === "string" && value.length > 6 && value.length < 32,
  message: `invalid ${label} ${field ?? "id"}`,
});

const getNameValidations = (label) => [
  {
    field: "name",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: `Kindly supply a ${label} Name`,
  },
  {
    field: "name",
    validator: (value) => value.length > 2,
    message: `${label} Name is too short`,
  },
  {
    field: "name",
    validator: (value) => value.length < 50,
    message: `${label} Name is too long`,
  },
];

const getTitleValidations = (label) => [
  {
    field: "title",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: `Kindly supply a ${label} Title`,
  },
  {
    field: "title",
    validator: (value) =>
      label === "Location" && !!value ? value.length > 2 : true,
    message: `${label} title is too short`,
  },
  {
    field: "title",
    validator: (value) =>
      label === "Route" ? value.length < 150 : value.length < 100,
    message: `${label} title is too long`,
  },
];

const getDescriptionValidations = (label) => [
  {
    field: "description",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: `Kindly supply a ${label} Description`,
  },
  {
    field: "description",
    validator: (value) => value.length > 2,
    message: `${label} Description is too short`,
  },
  {
    field: "description",
    validator: (value) => value.length < 300,
    message: `${label} Description is too long`,
  },
];

const getLcdaValidation = () => ({
  field: "lcda",
  validator: (value) => validLcdas.includes(value),
  message: "Kindly supply a valid LCDA",
});

const getLandMarkValidation = () => [
  {
    field: "landmark",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: "Kindly supply a Landmark",
  },
  {
    field: "landmark",
    validator: (value) => typeof value === "string" && value.length > 2,
    message: "Landmark is too short",
  },
  {
    field: "landmark",
    validator: (value) => typeof value === "string" && value.length < 150,
    message: "Landmark is too long",
  },
];

const getBusStopValidation = () => [
  {
    field: "busStop",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: "Kindly supply a Pickup Bus Stop",
  },
  {
    field: "busStop",
    validator: (value) => value.length > 2,
    message: "Pickup Bus Stop is too short",
  },
  {
    field: "busStop",
    validator: (value) => value.length < 50,
    message: "Pickup Bus Stop is too long",
  },
];

const getArrandDepTimeValidation = (field, label) => [
  {
    "field": field,
    validator: (value) => typeof value === "string" && value.length === 6,
    message: `Pickup point ${label} time must be in the format HH:MM`
  }
]

const addpickUpRules = [
  ...getNameValidations("Pickup"),
  // ...getTitleValidations("Pickup"),
  ...getDescriptionValidations("Pickup"),
  ...getBusStopValidation(),
  {
    field: "status",
    validator: (value) => value === "active" || value === "inactive",
    message: "Kindly supply a valid Pickup point status",
  },
  {
    field: "startOrEnd",
    validator: (value) => typeof value === "boolean",
    message: "Kindly supply a valid Pickup point startOrEnd",
  },
];

const addPickUpRulesWithLocationId = [
  ...addpickUpRules,
  getIdValidation("locationId"),
];

const addLocationRules = [
  ...getTitleValidations("Location"),
  getLcdaValidation("Location"),
  {
    field: "city",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: "Kindly supply a Location City",
  },
  {
    field: "city",
    validator: (value) => typeof value === "string" && value.length > 2,
    message: "Location City is too short",
  },
  {
    field: "city",
    validator: (value) => typeof value === "string" && value.length < 50,
    message: "Location City is too long",
  },
  {
    field: "area",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: "Kindly supply a Location Area",
  },
  {
    field: "area",
    validator: (value) => typeof value === "string" && value.length > 2,
    message: "Location Area is too short",
  },
  {
    field: "area",
    validator: (value) => typeof value === "string" && value.length < 50,
    message: "Location Area is too long",
  },
  ...getDescriptionValidations("Location"),
  ...getLandMarkValidation(),
];

const addRouteRules = [
  ...getNameValidations("Route"),
  ...getDescriptionValidations("Route"),
  getIdValidation("startPointId", "Route"),
  getIdValidation("endPointId", "Route"),
  getLcdaValidation(),
];
const editRouteRules = [
  ...addRouteRules,
  getIdValidation("id", "Route"),
];

const editLocationRules = [
  getIdValidation("id", "Location"),
  ...getTitleValidations("Location"),
  ...getDescriptionValidations("Location"),
  ...getLandMarkValidation(),
];

const editPickUpRules = [
  getIdValidation("id", "Pickup"),
  ...getTitleValidations("Pickup"),
  ...getDescriptionValidations("Pickup"),
  ...getBusStopValidation(),
  {
    field: "status",
    validator: (value) =>
      value === "active" || value === "inactive" || value === "suspended",
    message: "Kindly supply a valid Pickup point status",
  },
  {
    field: "startOrEnd",
    validator: (value) => typeof value === "boolean",
    message: "Kindly supply a valid Pickup point startOrEnd",
  },
];

const scheduleRouteRules = [
  getIdValidation("route_id", "Route"),
  getIdValidation("pickuppoint_id", "Pickup"),
  ...getArrandDepTimeValidation("arrival_time", "arrival"),
  ...getArrandDepTimeValidation("departure_time", "departure"),
  {
    field: "service",
    validator: (value) => typeof value === "number" && value === 0 || value === 1,
    message: "Kindly supply a valid service time",
  }
];

const createPickUpValidator = new Validator(addpickUpRules);
const editPickUpValidator = new Validator(editPickUpRules);
const createLocationValidator = new Validator(addLocationRules);
const editLocationValidator = new Validator(editLocationRules);
const pickUpWithLocationIdValidator = new Validator(
  addPickUpRulesWithLocationId
);
const addRouteValidator = new Validator(addRouteRules);
const editRouteValidator = new Validator(editRouteRules);
const scheduleRouteValidator = new Validator(scheduleRouteRules)


module.exports = {
  createPickUpValidator,
  editPickUpValidator,
  createLocationValidator,
  editLocationValidator,
  pickUpWithLocationIdValidator,
  routeValidator: addRouteValidator,
  editRouteValidator,
  scheduleRouteValidator
};
