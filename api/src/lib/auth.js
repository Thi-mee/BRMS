const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Validator = require("./validator");




class AuthResponse {
  success = false;
  token = null;
  user = null;
  message = "";
  constructor({ success, token, message, user }) {
    this.success = success;
    this.token = token;
    this.message = message;
    this.user = user;
  }
}

class SuccessResponse extends AuthResponse {
  constructor({ user }) {
    super({ success: true, user });
    this.message = "User is authenticated";
    this.token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  }
}

class ErrorResponse extends AuthResponse {
  constructor({ message }) {
    super({ success: false, message });
  }
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const loginRules = [
  {
    field: 'email',
    validator: (value) => typeof value === 'string' && value.length > 0,
    message: 'Email is required',
  },
  {
    field: "email",
    validator: (value) => emailRegex.test(value),
    message: "Invalid Credentials",
  },
  {
    field: 'password',
    validator: (value) => typeof value === 'string' && value.length > 0,
    message: 'Password is required',
  },
  {
    field: 'password',
    validator: (value) => value.length >= 6,
    message: 'Password must be at least 6 characters',
  }
];

const registerRules = [
    ...loginRules
];

const hashPassword = async (req) => {
  if (!req.body.password) {
    return;
  }
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  } catch (error) {
    throw new Error('Failed to hash password.');
  }
};

const verifyPassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error('Failed to verify password.');
  }
};





const loginValidator = new Validator(loginRules);
const registerValidator = new Validator(registerRules);

module.exports = { loginValidator, registerValidator, SuccessResponse, ErrorResponse, hashPassword, verifyPassword };


