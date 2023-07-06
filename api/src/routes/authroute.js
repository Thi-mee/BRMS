const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/authController');

// Define routes for authentication
router.post('/register', authController.register);
router.post('/login',passport.authenticate("local", {session: false}), authController.login);
router.post('/logout', authController.logout);
router.get('/verify', passport.authenticate("jwt", { session: false }), authController.getUser);


module.exports = router;