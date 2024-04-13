const express = require("express");
const Cart = require("../models/cart");
let area = "Cart";

// router is an instance of the express router.
// we use it to define our routes.
// The router will be added as a middleware and will take control of requests
const router = express.Router();

// API - GET get all carts information
router.get("/", async (req, res) => {
  try {
    let cart = await Cart.find({});

    if (!cart) {
      return res.status(404).send({ message: `No ${area} found` });
    }

    console.log(`${area} GET API Result: Succeed to get ${area}`, );
    res.status(200).send({ message: `Succeed to get ${area}`, data: cart });
  } catch (err) {
    console.log(`${area} GET API Error: `, err.message);
    res.status(500).send({ message: `Error get ${area}`, error: err });
  }
});

// API - GET get cart information from user id
router.get("/:id", async (req, res) => {
    try {
      let cart = await Cart.findById(req.params.id);

      if (!cart) {
        return res.status(404).send({ message: `No ${area} found` });
      }

      console.log(`${area} GET API Result: Succeed to get ${area}`, );
      res.status(200).send({ message: `Succeed to get ${area}`, data: cart });
    } catch (err) {
      console.log(`${area} GET API Error: `, err.message);
      res.status(500).send({ message: `Error get ${area}`, error: err });
    }
  });

// API - POST create a new cart for user by id
router.post(
  "/create",
  // isAuth,
  // isAdmin,
  async (req, res) => {
    let time = Date.now();
    req.body.time = time;
    // console.log('req.body: ', req.body);
    let cart = new Cart(req.body);

    console.log("new cart: ", cart);
    try {
      cart = await cart.save();
      console.log(`${area} CREATE API Result: `, cart);
      res.status(200).send({ message: `Succeed to create ${area}`, data: cart });
    } catch (err) {
      console.log(`${area} GET API Error: `, err.message);
      res.status(500).send({ message: `Error create ${area}`, error: err });
    }
  }
);

// API - PUT update existing cart information
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
      let cart = await Cart.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

      if (!cart) {
        return res.status(404).send({ message: 'No cart found' });
      }

      console.log(`${area} UPDATE API Result: `, cart);
      res.status(200).send({ message: `Succeed to update ${area}`, data: cart });
    } catch (err) {
      console.log(`${area} UPDATE API Error: `, err.message);
      res.status(500).send({ message: `Error update ${area}`, error: err });
    }
  }
);

// API - DELETE delete cart by id
router.delete(
  "/deleteCart/:id",
  // isAuth,
  // isAdmin,
  async (req, res) => {
    let time = Date.now();
    req.body.time = time;
    const { id } = req.params;

    try {
      let cart = await Cart.findByIdAndDelete(id);

      if (!cart) {
        return res.status(404).send({ message: 'No cart found or already deleted' });
      }

      console.log(`${area} DELETE API Result: Product deleted successfully`);
      res.status(200).send({ message: `Succeed to delete ${area}`, data: cart });
    } catch (err) {
      console.log(`${area} DELETE API Error: `, err.message);
      res.status(500).send({ message: `Error delete ${area}`, error: err });
    }
  }
);

// API - DELETE delete cart item by cart id and item id
router.delete(
    "/deleteCartItem/:id/:itemId",
    // isAuth,
    // isAdmin,
    async (req, res) => {
      let time = Date.now();
      req.body.time = time;
      const { id, itemId } = req.params;

      try {
        let cart = await Cart.findById(id).findByIdAndDelete(itemId);

        if (!cart) {
          return res.status(404).send({ message: 'No cart found or already deleted' });
        }

        console.log(`${area} DELETE API Result: Product deleted successfully`);
        res.status(200).send({ message: `Succeed to delete ${area}`, data: cart });
      } catch (err) {
        console.log(`${area} DELETE API Error: `, err.message);
        res.status(500).send({ message: `Error delete ${area}`, error: err });
      }
    }
  );

module.exports = router;
