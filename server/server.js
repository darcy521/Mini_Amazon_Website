const express = require("express");
const { spawn } = require("child_process");
const mongoose = require("mongoose");
const cors = require('cors');
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const loginRoutes = require("./routes/loginRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// encrypt mongoDB URI
require("dotenv").config({ path: "./config.env" });

// enable CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Specify the origin of your frontend application
  credentials: true // Allow credentials
}

app.use(cors(corsOptions));

// app.set('trust proxy', true); // trust proxy

// middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// authentication check
app.use("/", loginRoutes);

// create CRUD endpoints for product
app.use("/product", productRoutes);

// create CRUD endpoints for user
app.use("/user", userRoutes);

// create CRUD endpoints for cart
app.use("/cart", cartRoutes);

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
