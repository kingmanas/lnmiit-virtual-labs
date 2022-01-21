const redis = require("redis");
const mongoose = require("mongoose");

let _db, _redis;

function createRedisClient() {
  try {
    _redis = redis.createClient({
      url: "redis://redis:6379",
    });
    _redis.on("connect", () => console.log("Connected to redis..."));
    _redis.on("error", (err) => {
      console.log("Error: " + err);
    });
    _redis.connect();
  } catch (err) {
    console.log(err);
  }
  return _redis;
}

function createMongoClient() {
  try {
    mongoose.connect(`mongodb://mongo:27017/vlabs`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      retryWrites: true,
    });
  } catch (err) {
    console.log(err);
    return null;
  }

  _db = mongoose.connection;
  _db.on("error", console.error.bind(console, "connection error: "));
  _db.once("open", () => {
    console.log("Connected to MongoDB successfully.");
  });

  return _db;
}

// This utility will make sure that multiple connections
// are not made to the databases, in every flow
module.exports = {
  db: _db == null ? createMongoClient() : _db,
  redis: _redis == null ? createRedisClient() : _redis,
};
