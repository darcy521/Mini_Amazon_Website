const express = require("express");
const User = require("../models/user");
const checkRole = require("./checkRole");
const Session = require("../models/session");
let area = "User";

// router is an instance of the express router.
// we use it to define our routes.
// The router will be added as a middleware and will take control of requests
const router = express.Router();

// API - GET get all user information - /user/
router.get("/", checkRole(["manager"]), async (req, res) => {
  try {
    let user = await User.find({});

    if (!user) {
      return res.status(404).send({ message: `No ${area} found` });
    }

    console.log(`${area} GET API Result: Succeed to get ${area}`);
    res.status(200).send({ message: `Succeed to get ${area}`, data: user });
  } catch (err) {
    console.log(`${area} GET API Error: `, err.message);
    res.status(500).send({ message: `Error get ${area}`, error: err });
  }
});

// API - GET check login status - /user/status
router.get("/status", async (req, res) => {
  try {
    const sessionID = req.session.id;
    let session = await Session.findById(sessionID);

    if (!session) {
      return res.status(200).send({ message: `Not logged in` });
    }

    let userSession = session.toJSON();
    let userProfile = JSON.parse(userSession.session).user;

    console.log(
      `${area} GET status API Result: Succeed to get ${area} status: `,
      userProfile
    );
    res
      .status(200)
      .send({ message: `Succeed to get ${area} status`, data: userProfile });
  } catch (err) {
    console.log(`${area} GET status API Error: `, err.message);
    res.status(500).send({ message: `Error get ${area} status`, error: err });
  }
});

// API - GET get user information by id - /user/:id
router.get("/:id", checkRole(['manager', 'seller', 'customer']), async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: `No ${area} found` });
    }
    let userInfo = user.toJSON();
    const { name, email, role } = userInfo;
    console.log(`${area} GET user by id API Result: Succeed to get ${area} by id`);
    res.status(200).send({ message: `Succeed to get ${area}`, data: { name, email, role} });
  } catch (err) {
    console.log(`${area} GET user by id API Error: `, err.message);
    res.status(500).send({ message: `Error get ${area}`, error: err });
  }
});

// API - POST create new user - /user/create
router.post("/create", async (req, res) => {
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
});

// API - PUT update existing user information - /user/update/:id
router.put(
  "/update/:id",
  checkRole(["customer", "seller", "manager"]),
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
        return res.status(404).send({ message: "No user found" });
      }

      console.log(`${area} UPDATE API Result: `, user);
      res
        .status(200)
        .send({ message: `Succeed to update ${area}`, data: user });
    } catch (err) {
      console.log(`${area} UPDATE API Error: `, err.message);
      res.status(500).send({ message: `Error update ${area}`, error: err });
    }
  }
);

// API - DELETE delete existing user information - /user/delete/:id
router.delete(
  "/delete/:id",
  checkRole(["customer", "seller", "manager"]),
  async (req, res) => {
    let time = Date.now();
    req.body.time = time;
    const { id } = req.params;

    try {
      let user = await User.findByIdAndDelete(id);

      if (!user) {
        return res
          .status(404)
          .send({ message: "No user found or already deleted" });
      }

      console.log(`${area} DELETE API Result: Product deleted successfully`);
      res
        .status(200)
        .send({ message: `Succeed to delete ${area}`, data: user });
    } catch (err) {
      console.log(`${area} DELETE API Error: `, err.message);
      res.status(500).send({ message: `Error delete ${area}`, error: err });
    }
  }
);

module.exports = router;
