const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CardSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  dfc: { type: Boolean, required: true },
  image_1: { type: String, required: true },
  image_2: { type: String, required: true },
  mana_cost: { type: String, required: true },
  cmc: { type: Number, required: true },
  colors: { type: [String], required: true },
  rank: { type: String, required: true },
});

module.exports = mongoose.model('Card', CardSchema);