const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SetSchema = new Schema({
  name: { type: String, required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
});

module.exports = mongoose.model('Set', SetSchema);
