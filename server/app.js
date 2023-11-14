const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require('bcryptjs');
const cors = require("cors");
const mongoose = require("mongoose");

const User = require('./models/user')
const indexRouter = require('./routes/index');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

mongoose.set("strictQuery", false);
// Change this
const mongoDB =
  "mongodb+srv://greeneggsanddan:ZRxKxUPqGyu2U4vT@setreviewcluster.re3n16y.mongodb.net/set_review?retryWrites=true&w=majority";

async function main() {
  await mongoose.connect(mongoDB);
}

main().catch((err) => console.log(err));

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ secret: "brushwagg", resave: false, saveUninitialized: true }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

module.exports = app;
