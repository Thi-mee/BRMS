const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const pool = require("./config/dbConfig");
const morganMiddleware = require("./middlewares/morganMiddleware");

const app = express();
dotenv.config();

pool.connect((err, client, done) => {
  if (err) console.error(err);
  else console.log("Connected to database");
  done();
});

app.use(cors());
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

require("./config/passport")(app, passport);

require("./routes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
