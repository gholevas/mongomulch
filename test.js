var mongoose = require("mongoose");
var schema = new mongoose.Schema({
  sss: {
    type: Boolean,
    Required: true,
    Unique: true
  },
  dddd: {
    type: [Boolean],
    Select: true,
    Sparse: true
  },
  fdded: {
    type: Boolean,
  },
  ddd: {
    type: mongoose.Schema.Types.ObjectId,
    Select: true,
    ref: user
  },
  fff: {
    type: Boolean,
    Required: true,
    default: ddddf1
  },
  ddd: {
    type: Boolean,
    Required: true,
    default: hgg
  }
});
mongoose.model(user, schema);