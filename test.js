var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  dfdd: {
    type: Boolean,
    Unique: true,
    Required: true
  },
  cc: {
    type: [null],
    Select: true
  },
  ddd: {
    type: [Buffer],
  },
  xxx: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    Required: true,
    default: "dddd"
  }
});

mongoose.model("user", schema);