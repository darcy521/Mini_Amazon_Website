const express = require("express");
const { spawn } = require("child_process");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// encrypt mongoDB URI
require("dotenv").config({ path: "./config.env" });

// middleware to parse JSON bodies
app.use(express.json());

// create CRUD endpoints for product
app.use("/product", productRoutes);

// create CRUD endpoints for user
app.use("/user", userRoutes);

// connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => console.error("Could not connect to MongoBD...", err));

// define a POST Route and test python data-flow
app.post("/run-python", (req, res) => {
  const dataFromFrontend = req.body.message;
  const pythonProcess = spawn("python3", ["script.py", dataFromFrontend]);
  let dataString = "";

  pythonProcess.stdout.on("data", (data) => {
    dataString += data.toString();
  });

  pythonProcess.on("close", (code) => {
    console.log("req body", dataString);
    res.send({
      statusCode: code,
      output: dataString,
    });
  });
});

// start the server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
