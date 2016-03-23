var mongoose = require("mongoose");
var schema = new mongoose.Schema({
  name: {
    type: Number,
    Required: true
  },
  other field: {
    type: Number,
    Required: true
  },
  erwev: {
    type: [Number],
    Required: true
  },
  wed: {
    type: Number,
    Required: true
  }
});
mongoose.model(User, schema);