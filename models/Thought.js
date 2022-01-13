const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      //needs character limit 1-280 chars
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //getter method for formatting timestamp
    },
    username: {
      type: String,
      required: true,
    },
    reactions: {
      //array of nested docs created with reactionschema
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
