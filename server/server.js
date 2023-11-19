const express = require("express");
const { MongoClient } = require('mongodb');

const app = express();

async function main() {
  const uri = "mongodb+srv://Darcy:sD0KgqHYCwT6G6nq@darcy.4a5znni.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    //Connect to MongoDB cluster
    await client.connect().then(() => {console.log("connected to database!")});

    //Make the appropriate DB calls
    await listDatabases(client);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(`- ${db.name}`));
}

const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });