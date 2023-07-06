const {
  registerValidator,
  ErrorResponse,
  loginValidator,
  SuccessResponse,
} = require("../lib/auth");
const authService = require("../services/authService");
const { generateUniqueId } = require("../lib/utils");

const register = async (req, res, next) => {
  const errors = registerValidator.validate(req.body);
  if (errors.length > 0) {
    return res.status(400).json(ErrorResponse({ message: errors.join(", ") }));
  }
  req.body.id = generateUniqueId();
  try {
    const retVal = await authService.registerUser(req.body);
    if (retVal === null)
      return res
        .status(400)
        .json(ErrorResponse({ message: "Failed to create a new user" }));
    return res.status(201).json(SuccessResponse({ user: retVal }));
  } catch (error) {
    return res.status(500).json(ErrorResponse({ message: error.message }));
  }
};

const login = async (req, res, next) => {
  const errors = loginValidator.validate(req.body);
  if (errors.length > 0) {
    return res.status(400).json(ErrorResponse({ message: errors.join(", ") }));
  }
  try {
    const retVal = await authService.loginUser(req.body);
    if (retVal === null)
      return res
        .status(400)
        .json(ErrorResponse({ message: "Failed to login" }));
    return res.status(200).json(SuccessResponse({ user: retVal }));
  } catch (error) {
    return res.status(500).json(ErrorResponse({ message: error.message }));
  }
};

const logout = async (req, res, next) => {
  try {
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json(ErrorResponse({ message: error.message }));
  }
};

const getUser = async (req, res, next) => {
  try {
    const retVal = await authService.getUser(req.user.email);
    if (retVal === null)
      return res
        .status(400)
        .json(ErrorResponse({ message: "Failed to get user" }));
    return res.status(200).json(SuccessResponse({ user: retVal }));
  } catch (error) {
    return res.status(500).json(ErrorResponse({ message: error.message }));
  }
};

module.exports = {
  register,
  login,
  logout,
  getUser,
};
