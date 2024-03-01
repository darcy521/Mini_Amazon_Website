const { MongoClient } = require("mongodb");
const database = process.env.MONGODB_URI;
const client = new MongoClient(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: async function (callback) {
        try {
          await client.connect()
          .then (() => {
            console.log("successfully connected to mongodb!");
            _db = client.db("mini_amazon");
          });
        } catch (err) {
            console.error(err);
        }
    },

    getDb: function () {
        return _db;
    }
}