const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: new Schema.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: formatTime,
  },
});

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
      default: Date.now(),
      get: formatTime,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: reactionSchema,
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
  let year = date.getYear(date);
  let hours = date.getHours(date) + 1;
  let minutes = date.getMinutes(date);

  return `${month}/${day}/${year} at ${hours}:${minutes}`;
}
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
