const express = require("express");
const { spawn } = require('child_process');

const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
// app.use(require("./routes/productRoutes"));

// connect to driver
const dbo = require("./db/conn");
app.listen(PORT, () => {
  // dbo.connectToServer(function (err) {
  //   if (err) {
  //     console.error(err);
  //   }
  // })
  console.log(`Server listening on ${PORT}`);
});

// define a POST Route
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



