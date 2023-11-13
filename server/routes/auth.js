const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require("../models/user");

router.post("/signup", async (req, res, next) => {
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
          username,
        });
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", passport.authenticate("local"), async (req, res) => {
  try {
    const user = await req.user.populate("sets");
    const set = user.sets.find((s) => s.code === req.body.set);
    const data = set ? set.data : null;
    res.status(200).json({ username: req.user.username, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).send("User logged out");
  });
});

module.exports = router;
