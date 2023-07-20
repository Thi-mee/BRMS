const pool = require('./dbConfig');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;



module.exports = function(app, passport) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  })

  passport.deserializeUser(function(id, done) {
    pool.query('SELECT * FROM users WHERE id = $1', [id], function(err, result) {
      if (err) return done(err);
      done(err, result.rows[0]);
    });
  })

  passport.use(new LocalStrategy(
    {usernameField: 'email'},
    function(email, password, done) {
      const errors = loginValidator.validate(req.body);
      if (errors.length > 0) {
        return done(null, false, {message: errors.join(', ')});
      }

      pool.query('SELECT * FROM users WHERE email = $1', [email], function(err, result) {
        if (err) return done(err);
        if (!result.rows.length) return done(null, false, {message: 'Incorrect email.'});
        if (result.rows[0].password !== password) return done(null, false, {message: 'Incorrect password.'});
        return done(null, result.rows[0], {message: 'Logged in successfully.'});
      });
    }
  ));

  passport.use(new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    function(jwt_payload, done) {
      pool.query('SELECT * FROM users WHERE id = $1', [jwt_payload.id], function(err, result) {
        if (err) return done(err);
        if (!result.rows.length) return done(null, false, {message: 'Incorrect email.'});
        return done(null, result.rows[0], {message: 'Logged in successfully.'});
      });
    }
  ));  
}