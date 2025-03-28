const dotenv = require("dotenv");
dotenv.config();

const { MongoClient } = require("mongodb");
let database;

const initDb = (callback) => {
  if (database) {
    console.log("Database is already initialized");
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client.db(); // Store database instance instead of client
      console.log("Connected to MongoDB");
      callback(null, database);
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err);
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw new Error("Database is not initialized");
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase,
};
