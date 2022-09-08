const { MongoClient } = require("mongodb");
const connectingString = process.env.ATLAS_URI;
const client = new MongoClient(connectingString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnect;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }
      dbConnect = db.db("tools");
      console.log("Successfully connect to MongoDB");

      return callback();
    });
  },
  getDb: function () {
    return dbConnect;
  },
};
