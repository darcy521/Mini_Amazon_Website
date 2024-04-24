const express = require("express");
const Cart = require("../models/cart");
const checkRole = require("./checkRole");
let area = "Cart";

// router is an instance of the express router.
// we use it to define our routes.
// The router will be added as a middleware and will take control of requests
const router = express.Router();

// API - GET get all carts information - /cart/
router.get("/", checkRole(["manager"]), async (req, res) => {
  try {
    let cart = await Cart.find({});

    if (!cart) {
      return res.status(404).send({ message: `No ${area} found` });
    }

    console.log(`${area} GET API Result: Succeed to get ${area}`);
    res.status(200).send({ message: `Succeed to get ${area}`, data: cart });
  } catch (err) {
    console.log(`${area} GET API Error: `, err.message);
    res.status(500).send({ message: `Error get ${area}`, error: err });
  }
});

// API - GET get cart information from user id - /cart/:id
router.get("/:id", checkRole(["customer"]), async (req, res) => {
  try {
    let cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).send({ message: `No ${area} found` });
    }

    console.log(`${area} GET API Result: Succeed to get ${area}`);
    res.status(200).send({ message: `Succeed to get ${area}`, data: cart });
  } catch (err) {
    console.log(`${area} GET API Error: `, err.message);
    res.status(500).send({ message: `Error get ${area}`, error: err });
  }
});

// API - POST create a new cart for user by id - /cart/create
router.post(
  "/create",
  checkRole(["customer"]),
  async (req, res) => {
    let time = Date.now();
    req.body.time = time;
    // console.log('req.body: ', req.body);
    let cart = new Cart(req.body);

    console.log("new cart: ", cart);
    try {
      cart = await cart.save();
      console.log(`${area} CREATE API Result: `, cart);
      res
        .status(200)
        .send({ message: `Succeed to create ${area}`, data: cart });
    } catch (err) {
      console.log(`${area} GET API Error: `, err.message);
      res.status(500).send({ message: `Error create ${area}`, error: err });
    }
  }
);

// API - PUT update existing cart information - /cart/update/:id
router.put(
  "/update/:id",
  checkRole(["customer"]),
  async (req, res) => {
    let time = Date.now();
    req.body.time = time;
    const { id } = req.params;
    let updates = req.body;
    // console.log('req.body: ', updates);

    try {
      let cart = await Cart.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

      if (!cart) {
        return res.status(404).send({ message: "No cart found" });
      }

      console.log(`${area} UPDATE API Result: `, cart);
      res
        .status(200)
        .send({ message: `Succeed to update ${area}`, data: cart });
    } catch (err) {
      console.log(`${area} UPDATE API Error: `, err.message);
      res.status(500).send({ message: `Error update ${area}`, error: err });
    }
  }
);

// API - DELETE delete cart by id - /cart/deleteCart/:id
router.delete(
  "/deleteCart/:id",
  checkRole(["customer"]),
  async (req, res) => {
    let time = Date.now();
    req.body.time = time;
    const { id } = req.params;

    try {
      let cart = await Cart.findByIdAndDelete(id);

      if (!cart) {
        return res
          .status(404)
          .send({ message: "No cart found or already deleted" });
      }

      console.log(`${area} DELETE API Result: Product deleted successfully`);
      res
        .status(200)
        .send({ message: `Succeed to delete ${area}`, data: cart });
    } catch (err) {
      console.log(`${area} DELETE API Error: `, err.message);
      res.status(500).send({ message: `Error delete ${area}`, error: err });
    }
  }
);

// API - DELETE delete cart item by cart id and item id - /cart/deleteCartItem/:id/:itemId
router.delete(
  "/deleteCartItem/:id/:itemId",
  checkRole(["customer"]),
  async (req, res) => {
    let time = Date.now();
    req.body.time = time;
    const { id, itemId } = req.params;

    try {
      let cart = await Cart.findById(id).findByIdAndDelete(itemId);

      if (!cart) {
        return res
          .status(404)
          .send({ message: "No cart found or already deleted" });
      }

      console.log(`${area} DELETE API Result: Product deleted successfully`);
      res
        .status(200)
        .send({ message: `Succeed to delete ${area}`, data: cart });
    } catch (err) {
      console.log(`${area} DELETE API Error: `, err.message);
      res.status(500).send({ message: `Error delete ${area}`, error: err });
    }
  }
);

module.exports = router;
