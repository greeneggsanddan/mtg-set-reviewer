const express = require('express');
const router = express.Router();

const Set = require("../models/set");

router.post("/:set", async (req, res) => {
  try {
    const { user } = req;
    const set = new Set({
      user: user._id,
      code: req.params.set,
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

router.put("/:set", async (req, res) => {
  try {
    await Set.findOneAndUpdate(
      { code: req.params.set, user: req.user._id },
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

module.exports = router;