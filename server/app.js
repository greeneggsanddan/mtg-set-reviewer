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

const Schema = mongoose.Schema;

mongoose.set("strictQuery", false);
// Change this
const mongoDB =
  "mongodb+srv://greeneggsanddan:ZRxKxUPqGyu2U4vT@setreviewcluster.re3n16y.mongodb.net/set_review?retryWrites=true&w=majority";

async function main() {
  await mongoose.connect(mongoDB);
}

main().catch((err) => console.log(err));

const User = require("./models/user");
const Set = require("./models/set");

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const setRouter = require('./routes/sets');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
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

// Sends the username of the currently logged in user (For testing purposes)
app.get("/api", (req, res) => {
  if (req.user) {
    res.json({ message: `Current user: ${req.user.username}` });
  } else {
    res.json({message: "No current user"})
  }
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).send("User logged out");
  });
});

app.post("/signup", async (req, res, next) => {
  const { username } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.json({ exists: true });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        username,
        password: hashedPassword,
        sets: [],
      });
      await user.save();

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          message: `${username} saved and logged in`,
          exists: false,
          username
        });
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", passport.authenticate("local"), async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("sets");
    const set = user.sets.find((s) => s.name === req.body.set);
    const data = set ? set.data : null;
    res.status(200).json({ username: req.user.username, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/sets/:set", async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const set = new Set({
      user: req.user._id,
      name: req.params.set,
      data: req.body,
    });

    await set.save();

    user.sets.push(set);
    await user.save();

    res.status(200).json({
      message: `${req.user.username} has created a set review for ${req.params.set}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/sets/:set", async (req, res) => {
  try {
    await Set.findOneAndUpdate(
      { name: req.params.set, user: req.user._id },
      { data: req.body },
    );
    res
      .status(200)
      .json({ message: `${req.user.username} has updated ${req.params.set}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;
