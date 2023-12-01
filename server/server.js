const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(require("./routes/productRoutes"));

// connect to driver
const dbo = require("./db/conn");
app.listen(PORT, () => {
  dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
    }
  })
  console.log(`Server listening on ${PORT}`);
});

// async function main() {
//   const uri = "mongodb+srv://Darcy:sD0KgqHYCwT6G6nq@darcy.4a5znni.mongodb.net/";
//   const client = new MongoClient(uri);

//   try {
//     //Connect to MongoDB cluster
//     await client.connect().then(() => { console.log("connected to database!") });

//     //Make the appropriate DB calls
//     await listDatabases(client);

//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }
// }

// main().catch(console.error);

// async function listDatabases(client) {
//   let databasesList = await client.db().admin().listDatabases();

//   console.log("Databases:");
//   databasesList.databases.forEach(db => console.log(`- ${db.name}`));
// }

// app.use(cors());
// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// app.use('/api/users', userRouter);


