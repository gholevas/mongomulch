var mongoose = require("mongoose");
var schema = new mongoose.Schema({
  vedqw: {
    type: Number,
    Unique: true,
    Required: true
  },
  dfcdsx: {
    type: [Number],
    Text: true,
    default: evwedqw
  },
  gdvwde: {
    type: Number,
    Select: true,
    Sparse: true
  }
});
mongoose.model(User, schema);