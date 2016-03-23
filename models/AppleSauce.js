var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  something: {
    type: String,
  },
  somethingelse: {
    type: String,
    Unique: true,
    Required: true,
    Sparse: true
  },
  dateAdded: {
    type: Date,
  }
});

mongoose.model("AppleSauce", schema);