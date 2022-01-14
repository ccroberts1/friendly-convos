const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatTime,
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

function formatTime(date) {
  let day = date.getDate(date);
  let month = date.getMonth(date) + 1;
  let hours = date.getHours(date) + 1;
  let minutes = date.getMinutes(date);

  return `${month}/${day} at ${hours}:${minutes}`;
}
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
