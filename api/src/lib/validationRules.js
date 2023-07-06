const Validator = require("./validator");

const addpickUpRules = [
  {
    field: "id",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: "Kindly supply a pickup id",
  },
  {
    field: "name",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: "Kindly supply a Pickup Name",
  },
  {
    field: "name",
    validator: (value) => value.length > 2,
    message: "Pickup Name is too short",
  },
  {
    field: "name",
    validator: (value) => value.length < 50,
    message: "Pickup Name is too long",
  },
  {
    field: "title",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: "Kindly supply a Pickup Title",
  },
  {
    field: "title",
    validator: (value) => value.length < 150,
    message: "Pickup title is too long",
  },
  {
    field: "description",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: "Kindly supply a Pickup Description",
  },
  {
    field: "description",
    validator: (value) => value.length > 2,
    message: "Pickup Description is too short",
  },
  {
    field: "description",
    validator: (value) => value.length < 150,
    message: "Pickup Description is too long",
  },
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

  {
    field: "code",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: "Kindly supply a Pickup Code",
  },
  {
    field: "code",
    validator: (value) => value.length > 10,
    message: "Pickup Code is too short",
  },
  {
    field: "code",
    validator: (value) => value.length < 50,
    message: "Pickup Code is too long",
  },

  {
    field: "status",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: "Kindly supply a valid Pickup Status",
  },

  {
    field: "locationId",
    validator: (value) =>
      typeof value === "string" && value.length > 6 && value.length < 25,
    message: "Kindly supply a Pickup Location",
  },
];

const addLocationRules = [
  {
    field: "title",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: "Kindly supply a Location Title",
  },
  {
    field: "title",
    validator: (value) => typeof value === "string" && value.length < 150,
    message: "Location Title is too long",
  },
  {
    field: "lcda",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: "Kindly supply a Location LCDA",
  },
  {
    field: "lcda",
    validator: (value) => typeof value === "string" && value.length > 2,
    message: "Location LCDA is too short",
  },
  {
    field: "lcda",
    validator: (value) => typeof value === "string" && value.length < 50,
    message: "Location LCDA is too long",
  },
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
  {
    field: "description",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: "Kindly supply a Location Description",
  },
  {
    field: "description",
    validator: (value) => typeof value === "string" && value.length > 2,
    message: "Location Description is too short",
  },
  {
    field: "description",
    validator: (value) => typeof value === "string" && value.length < 300,
    message: "Location Description is too long",
  },
  {
    field: "landmark",
    validator: (value) => typeof value === "string" && value.length > 0,
    message: "Kindly supply a Location Landmark",
  },
  {
    field: "landmark",
    validator: (value) => typeof value === "string" && value.length > 2,
    message: "Location Landmark is too short",
  },
  {
    field: "landmark",
    validator: (value) => typeof value === "string" && value.length < 150,
    message: "Location Landmark is too long",
  },
];

const pickUpValidator = new Validator(addpickUpRules);
const locationValidator = new Validator(addLocationRules);

module.exports = {
  pickUpValidator,
  locationValidator,
};
