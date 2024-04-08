const express = require("express");
const { spawn } = require('child_process');
const mongoose = require('mongoose');
const productRouter = require('./routes/productRoutes')

const app = express();
const PORT = process.env.PORT || 3001;

// encrypt mongoDB URI
require("dotenv").config({ path: "./config.env" });

// const cors = require("cors");
// app.use(cors());


// middleware to parse JSON bodies
app.use(express.json());
app.use("/product", productRouter);

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((res) => {
    console.log('Connected to MongoDB...');
    // console.log(res);
  })
  .catch(err => console.error('Could not connect to MongoBD...', err));

// connect to driver
// const dbo = require("./db/conn");

// define a POST Route and test python data-flow
app.post('/run-python', (req, res) => {
  const dataFromFrontend = req.body.message;
  const pythonProcess = spawn('python3', ['script.py', dataFromFrontend]);
  let dataString = '';

  pythonProcess.stdout.on('data', (data) => {
    dataString += data.toString();
  });

  pythonProcess.on('close', (code) => {
    console.log('req body', dataString);
    res.send({
      statusCode: code,
      output: dataString,
    });
  })
})

// start the server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});



