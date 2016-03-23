var mongoose = require("mongoose");
var schema = new mongoose.Schema({
  name: {
    type: String,
    0: Required
  },
  email: {
    type: String,
    0: Required,
    1: Unique
  },
  orders: {
    type: Array of...,
  },
  etryu: {
    type: Array of...,
    0: Unique,
    1: Required
  },
  something else: {
    type: Boolean,
    Required: true,
    Select: true,
    default: sometre
  }
});
mongoose.model(User, schema);