const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");
const userSchema = new Schema(
  {
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
    thoughts: [thoughtSchema],
    friends: {
      //Needs to self-reference
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
  //Also needs a virtual called friendCount that retrieves the length of the user's friends array field on query
);

const User = model("user", userSchema);

module.exports = User;
