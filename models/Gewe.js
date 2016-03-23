var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    Unique: true,
    Required: true
  },
  address: {
    type: Date,
    Unique: true,
    Required: true
  },
  omethingesle: {
    type: String,
    Unique: true
  }
});

mongoose.model("Gewe", schema);