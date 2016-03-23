var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  sss: {
    type: Number,
    Required: true
  }
});

mongoose.model("Ddd", schema);