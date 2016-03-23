var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  vedqw: {
    type: Number,
    Unique: true,
    Required: true
  },
  dfcdsx: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AppleSauce",
    Text: true
  },
  gdvwde: {
    type: Number,
    Select: true,
    Sparse: true,
    default: "edeffef"
  }
});

mongoose.model("User", schema);