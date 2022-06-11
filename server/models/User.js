const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  // name: String,
  // age: Number,
  // city: String,
  // country: String,
  // gender: String,

  userimage: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  district: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
