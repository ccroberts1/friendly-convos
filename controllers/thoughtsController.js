const { Thought } = require("../models");

module.exports = {
  //Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //Get a single Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Create a new Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //Remove a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : Thought.deleteOne({ _id: req.params.thoughtId })
      )
      .then(() => res.json({ message: "Thought deleted!" }))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //Create a reaction
  createReaction(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((result) => {
        if (!result) {
          res.status(404).json({ message: "No thought with that ID" });
        } else {
          result.reactions.push(req.body);
          res.json(result);
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //Remove a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.body.reactionId } },
      { runValidators: true, new: true }
    )
      .then((result) => {
        if (!result) {
          res.status(404).json({ message: "No thought with that ID" });
        } else {
          res.json(result);
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
