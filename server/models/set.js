const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SetSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  code: { type: String, required: true },
  data: [
    {
      name: String,
      id: String,
      index: Number,
      dfc: Boolean,
      image_1: String,
      image_2: String,
      mana_cost: String,
      cmc: Number,
      colors: [String],
      rank: String,
    },
  ],
});

module.exports = mongoose.model('Set', SetSchema);
