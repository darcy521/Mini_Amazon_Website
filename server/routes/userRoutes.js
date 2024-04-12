const express = require("express");
const User = require("../models/user");
let area = "User";

// router is an instance of the express router.
// we use it to define our routes.
// The router will be added as a middleware and will take control of requests
const router = express.Router();

// API - GET get user information
router.get("/", async (req, res) => {
  try {
    let user = await User.find({});

    if (!user) {
      return res.status(404).send({ message: `No ${area} found` });
    }

    console.log(`${area} GET API Result: Succeed to get ${area}`, );
    res.status(200).send({ message: `Succeed to get ${area}`, data: user });
  } catch (err) {
    console.log(`${area} GET API Error: `, err.message);
    res.status(500).send({ message: `Error get ${area}`, error: err });
  }
});

// API - POST create new user
router.post(
  "/create",
  // isAuth,
  // isAdmin,
  async (req, res) => {
    let time = Date.now();
    req.body.time = time;
    // console.log('req.body: ', req.body);
    let user = new User(req.body);

    console.log("new user: ", user);
    try {
      user = await user.save();
      console.log(`${area} CREATE API Result: `, user);
      res.status(200).send({ message: `Succeed to create ${area}`, data: user });
    } catch (err) {
      console.log(`${area} GET API Error: `, err.message);
      res.status(500).send({ message: `Error create ${area}`, error: err });
    }
  }
);

// API - PUT update existing user information
router.put(
  "/update/:id",
  // isAuth,
  // isAdmin,
  async (req, res) => {
    let time = Date.now();
    req.body.time = time;
    const { id } = req.params;
    let updates = req.body;
    // console.log('req.body: ', updates);

    try {
      let user = await User.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        return res.status(404).send({ message: 'No user found' });
      }

      console.log(`${area} UPDATE API Result: `, user);
      res.status(200).send({ message: `Succeed to update ${area}`, data: user });
    } catch (err) {
      console.log(`${area} UPDATE API Error: `, err.message);
      res.status(500).send({ message: `Error update ${area}`, error: err });
    }
  }
);

// API - DELETE delete existing user information
router.delete(
  "/delete/:id",
  // isAuth,
  // isAdmin,
  async (req, res) => {
    let time = Date.now();
    req.body.time = time;
    const { id } = req.params;

    try {
      let user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).send({ message: 'No user found or already deleted' });
      }

      console.log(`${area} DELETE API Result: Product deleted successfully`);
      res.status(200).send({ message: `Succeed to delete ${area}`, data: user });
    } catch (err) {
      console.log(`${area} DELETE API Error: `, err.message);
      res.status(500).send({ message: `Error delete ${area}`, error: err });
    }
  }
);

module.exports = router;