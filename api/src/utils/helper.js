const { v4: uuidv4 } = require("uuid");
const { ErrorResponse } = require("../lib/pickup");

const generateUniqueId = () => {
  return uuidv4().slice(0, 29);
};

const generateCode = (name) => {
  return `LOC-${name.slice(0, 3)}-${new Date().toISOString()}`;
};

const errorResponseObj = (message) => ({ success: false, message });

const handleValidationError = (res, errors) => {
  return res
    .status(400)
    .json(errorResponseObj(errors.map((i) => i.message).join(", ")));
};

// convert snake_case to camelCase
const convertToCamelCase = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    let value = obj[key]

    const newKey = key.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace("_", "");
    });

    if (typeof value === "object" && value !== null) {
      value = convertToCamelCase(value);
    }

    newObj[newKey] = value;
  });
  return newObj;
};


module.exports = {
  generateCode,
  generateUniqueId,
  handleValidationError,
  errorResponseObj,
  convertToCamelCase,
};
