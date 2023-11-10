const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  sets: [{ type: Schema.Types.ObjectId, ref: 'Set' }],
});

module.exports = mongoose.model('User', UserSchema);
