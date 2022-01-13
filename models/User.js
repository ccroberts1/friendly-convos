const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      "Please provide a valid email address",
    ],
  },
  thoughts: {
    //Needs to be added after thoughts model
  },
  friends: {
    //Needs to self-reference
  },
  //Also needs a virtual called friendCount that retrieves the length of the user's friends array field on query
});
