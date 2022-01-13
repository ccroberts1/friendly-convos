const { connect, connection } = require("mongoose");

const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/DB";

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedToplogy: true,
});

module.exports = connection;
