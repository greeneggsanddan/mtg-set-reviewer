const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');

const cors = require('cors');

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.set("strictQuery", false);
// Change this
const mongoDB =
  "mongodb+srv://greeneggsanddan:ZRxKxUPqGyu2U4vT@setreviewcluster.re3n16y.mongodb.net/?retryWrites=true&w=majority";

async function main() {
  await mongoose.connect(mongoDB);
}

main().catch((err) => console.log(err));

const User = mongoose.model(
  'User',
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
  })
)

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// const setRouter = require('./routes/sets');

const app = express();

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/sets", setRouter);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    };
  })
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
  };
});

app.use(
  session({ secret: "brushwagg", resave: false, saveUninitialized: true }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.post('/signup', async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) return next(err);
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      const result = await user.save();
      res.status(200).json({ message: "User saved" });
    });
  } catch (err) {
    return next(err);
  }
});

app.post(
  "/login",
  passport.authenticate("local"), (req, res) => {
    res.status(200).json({ username: req.user.username });
  }
);

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "User logged out" });
  })
})

module.exports = app;
