const connection = require("../config/connection");
// const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("Database is connected");
  console.log("Seeding is complete");
  process.exit(0);
});
