const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  roles: {
    user: {
      type: Number,
      default: 2001,
    },
    staff: Number,
    admin: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
  // refreshToken: String,
});

module.exports = mongoose.model('User', userSchema);
