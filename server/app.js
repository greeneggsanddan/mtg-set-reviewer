const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require('bcryptjs');

const cors = require('cors');

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.set("strictQuery", false);
// Change this
const mongoDB =
  "mongodb+srv://greeneggsanddan:ZRxKxUPqGyu2U4vT@setreviewcluster.re3n16y.mongodb.net/set_review?retryWrites=true&w=majority";

async function main() {
  await mongoose.connect(mongoDB);
}

main().catch((err) => console.log(err));

const User = require('./models/user');
const Set = require('./models/set')

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const setRouter = require('./routes/sets');

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

const app = express();

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/sets", setRouter);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({ secret: "brushwagg", resave: false, saveUninitialized: true }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Sends the username of the currently logged in user (For testing purposes)
app.get('/api', (req, res) => {
  if (req.user) res.json({ username: req.user.username, sets: req.user.sets });
  else console.log('The user is:', req.user);
})

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).send('User logged out');
  })
})

app.post('/signup', async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) return next(err);
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        sets: [],
      });
      await user.save();
      res.status(200).send('User saved');
    });
  } catch (err) {
    return next(err);
  }
});

app.post(
  "/login",
  passport.authenticate("local"), (req, res) => {
    res.status(200).json({ username: req.user.username, sets: req.user.sets});
  }
);

app.post('/sets/:setId', async (req, res, next) => {
  try {
    const set = new Set({
      user: req.user._id,
      name: req.params.setId,
      data: req.body
    })
    await set.save();
    res.status(200).send('OK');
  } catch (err) {
    return next(err);
  }
});

// app.put(
//   '/:setId', async (req, res, next) => {
//     try {

//     }
//     // PUT HTTP method on req.user's ${req.params.setId} resource
//   }

// )

module.exports = app;
