const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { users, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("Database is connected");
  await User.deleteMany({});
  await Thought.deleteMany({});
  await User.insertMany(users);
  await Thought.insertMany(thoughts);
  console.log("Seeding is complete");
  process.exit(0);
});
