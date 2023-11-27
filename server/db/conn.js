const { MongoClient } = require("mongodb");
const database = process.env.MONGODB_URI;
const client = new MongoClient(database);

var _db;

module.exports = {
    connectToServer: async function (callback) {
        try {
          await client.connect(function(err, db) {
            if (err) {
                throw err;
            }

            if (db) {
                _db = db.db('mini_amazon');
            }
          })
          .then ((res) => {
            console.log("successfully connected to mongodb!");
            console.log("_db: ", _db);
            const result = client.db("mini_amazon")
              .collection("products")
              .find().toArray(function(err, data) {
                if (err) throw err;
              })
              .then((res) => console.log(res));
            console.log("result: ", result);
          });
        } catch (err) {
            console.error(err);
        }
        
    },

    getDb: function () {
        return _db;
    }
}