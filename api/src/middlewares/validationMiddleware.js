const { body,param, validationResult } = require("express-validator");
const pool = require("../config/dbConfig");
const { PICKUP_POINT, LOCATION } = require("../utils/constants").TABLES;
const { LCDAS } = require("../utils/constants");

const idValidationChain = (id = "id") => {
  return body(id)
    .optional()
    .isString()
    .withMessage(`Field ${id} must be a string`)
    .isLength({ min: 23 })
    .withMessage(`Field ${id} must be at least 23 characters long`)
    .isLength({ max: 50 })
    .withMessage(`Field ${id} must be at most 50 characters long`)
    .trim()
    .escape()
    .customSanitizer((value, { req }) => {
      req.body.id = value;
      return value;
    });
};

const ppIdValidationChain = (id = "id") => {
  return idValidationChain(id).custom(async (value, { req }) => {
    const pid = req.body[id];
    const query = `
      SELECT 
        *
      FROM 
        ${PICKUP_POINT}
      WHERE 
        id = $1
    `;
    const { rows } = await pool.query(query, [pid]);
    if (rows.length === 0) {
      throw new Error("Pickup point not found");
    }
    return true;
  });
};

const lIdValidationChain = (id = "id") => {
  return idValidationChain(id).custom(async (value, { req }) => {
    const lid = req.body[id];
    const query = `
        SELECT
          *
        FROM
          ${LOCATION}
        WHERE
          id = $1
      `;
    const { rows } = await pool.query(query, [lid]);
    if (rows.length === 0) {
      throw new Error("Location not found");
    }
    return true;
  });
};

const optionalTextChain = (field, options) => {
  const { min, max } = options || { min: 3, max: 50 };
  return body(field)
    .optional()
    .isString()
    .withMessage(`Invalid ${field}`)
    .isLength({ min })
    .withMessage(`${field} must be at least ${min} characters long`)
    .isLength({ max })
    .withMessage(`${field} must be at most ${max} characters long`)
    .trim()
    .escape()
    .customSanitizer((value, { req }) => {
      req.body[field] = value;
      return value;
    });
};

const requiredTextChain = (field, options) => {
  const { min, max } = options || { min: 3, max: 50 };
  return body(field)
    .exists()
    .withMessage(`${field} is required`)
    .isString()
    .withMessage(`Invalid ${field}`)
    .isLength({ min })
    .withMessage(`${field} must be at least ${min} characters long`)
    .isLength({ max })
    .withMessage(`${field} must be at most ${max} characters long`)
    .trim()
    .escape()
    .customSanitizer((value, { req }) => {
      req.body[field] = value;
      return value;
    });
};

const requiredBooleanChain = (field) => {
  return body(field)
    .exists()
    .withMessage(`${field} is required`)
    .isBoolean()
    .withMessage(`Field ${field} must be a boolean`)
    .customSanitizer((value, { req }) => {
      req.body[field] = value;
      return value;
    });
};

const optionalLocationChain = () => {
  return body("location").optional().isObject().withMessage("Invalid location");
};

const optionalLcdaChain = (field = "lcda") => {
  return body(field)
    .optional()
    .custom((value) => {
      if (!LCDAS.includes(value)) {
        throw new Error("Invalid lcda");
      }
      return true;
    });
};

const requiredLcdaChain = () => {
  return body("lcda")
    .exists()
    .withMessage("lcda is required")
    .custom((value) => {
      if (!LCDAS.includes(value)) {
        throw new Error("Invalid lcda");
      }
      return true;
    });
};

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors
      .array()
      .map((error) => {
        return {
          field: error.path,
          message: error.msg,
        };
      })
      .reduce((acc, curr) => {
        if (acc[curr.field]) {
          acc[curr.field].push(curr.message);
        } else {
          acc[curr.field] = [curr.message];
        }
        return acc;
      }, {});
    return res.status(400).json({
      status: "error",
      message: "Invalid request data",
      errors: formattedErrors,
    });
  }
  next();
};

const pickupValidate = [
  ppIdValidationChain(),
  requiredTextChain("name", { min: 3, max: 50 }),
  optionalTextChain("title"),
  requiredTextChain("description"),
  requiredTextChain("busStop"),
  body("status")
    .notEmpty()
    .withMessage("status is required")
    .custom((value) => {
      if (value !== "active" && value !== "inactive") {
        throw new Error("status must be either active or inactive");
      }
      return true;
    }),
  requiredBooleanChain("startOrEnd"),
  lIdValidationChain("locationId"),
  optionalLocationChain(),
  optionalTextChain("location.title"),
  optionalTextChain("location.description"),
  optionalTextChain("location.landmark"),
  optionalLcdaChain("location.lcda"),
  optionalTextChain("location.city"),
  optionalTextChain("location.area"),
  body("rest").custom(async (value, { req }) => {
    if (req.body.locationId && req.body.location) {
      throw new Error("Cannot provide both locationId and location");
    }
    if (!req.body.locationId && !req.body.location) {
      throw new Error("Provide either locationId or location");
    }
    if (req.body.location) {
      const errors = [];
      if (!req.body.location.title) {
        errors.push("location.title is required");
      }
      if (!req.body.location.description) {
        errors.push("location.description is required");
      }
      if (!req.body.location.landmark) {
        errors.push("location.landmark is required");
      }
      if (!req.body.location.lcda) {
        errors.push("location.lcda is required");
      }
      if (!req.body.location.city) {
        errors.push("location.city is required");
      }
      if (!req.body.location.area) {
        errors.push("location.area is required");
      }
      if (errors.length > 0) {
        throw new Error(errors.join(", "));
      }
      const query = `
        SELECT 
          *
        FROM 
          ${LOCATION}
        WHERE 
          title = $1
      `;
      const { rows } = await pool.query(query, [req.body.location.title]);
      if (rows.length > 0) {
        throw new Error(
          `Location with title "${req.body.location.title}" already exists`
        );
      }
    }
    return true;
  }),
  validationMiddleware,
];

const idParamValidate = () => {
  return param("id")
    .isLength({ min: 23 })
    .withMessage("Invalid id")
    .isLength({ max: 50 })
    .withMessage("Invalid id")
    .trim()
    .escape()
    .customSanitizer((value, { req }) => {
      req.params.id = value;
      return value;
    })
}

const locationIdValidationChain = () => {
  return idParamValidate().custom(async (value, { req }) => {
    const query = `
      SELECT 
        *
      FROM 
        ${LOCATION}
      WHERE 
        id = $1
    `;
    const { rows } = await pool.query(query, [value]);
    if (rows.length === 0) {
      throw new Error("Location not found");
    }
    return true;
  });
}

const pickupIdParamValidate = () => {
  return idParamValidate().custom(async (value, { req }) => {
    const query = `
      SELECT 
        *
      FROM 
        ${PICKUP_POINT}
      WHERE 
        id = $1
    `;
    const { rows } = await pool.query(query, [value]);
    if (rows.length === 0) {
      throw new Error("Pickup point not found");
    }
    return true;
  });
}

const locationIdPValidate = [
  locationIdValidationChain(),
  validationMiddleware,
];

const pickupIdPValidate = [
  pickupIdParamValidate(),
  validationMiddleware,
];

const locationValidate = [
  idValidationChain(),
  requiredTextChain("title"),
  requiredTextChain("description"),
  requiredTextChain("landmark"),
  requiredLcdaChain(),
  requiredTextChain("city"),
  requiredTextChain("area"),
  validationMiddleware,
];

const routeValidate = [
  idValidationChain(),
  requiredTextChain("name"),
  requiredTextChain("title"),
  requiredTextChain("description"),
  requiredTextChain("lcda"),
  idValidationChain("startPointId"),
  idValidationChain("endPointId"),
  validationMiddleware,
];

module.exports = {
  pickupValidate,
  locationValidate,
  routeValidate,
  locationIdPValidate,
  pickupIdPValidate,
};
