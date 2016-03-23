var mongoose = require("mongoose");
var schema = new mongoose.Schema({
<<<<<<< HEAD
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
=======
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
>>>>>>> 140ef75e160f2d2fea17574763cdfdc32e19c1ca
