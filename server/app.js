require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./models/user");
const indexRouter = require("./routes/index");

mongoose.set("strictQuery", false);
const mongoDB = `${process.env.DATABASE_URL}`;

async function main() {
  await mongoose.connect(mongoDB);
}

main().catch((err) => console.log(err));

const app = express();

app.set('trust proxy', 1)
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: true,
    cookie: { sameSite: 'none', secure: process.env.NODE_ENV === "production" },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

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

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://mtg-set-reviewer.netlify.app"
        : "http://localhost:5173",
    credentials: true,
  }),
);
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

module.exports = app;
