const express = require("express");
const Product = require("../models/product");
const checkRole = require("./checkRole");
let area = "Product";

// router is an instance of the express router.
// we use it to define our routes.
// The router will be added as a middleware and will take control of requests
const router = express.Router();

// API - GET get product information - /product/
router.get("/", async (req, res) => {
  try {
    let product = await Product.find({});

    if (!product) {
      return res.status(404).send({ message: 'No product found' });
    }

    console.log(`${area} GET API Result: Succeed to get ${area}`, );
    res.status(200).send({ message: `Succeed to get ${area}`, data: product });
  } catch (err) {
    console.log(`${area} GET API Error: `, err.message);
    res.status(500).send({ message: `Error get ${area}`, error: err });
  }
});

// API - POST create new product - /product/create
router.post(
  "/create",
  checkRole(['manager', 'seller']),
  async (req, res) => {
    let time = Date.now();
    req.body.time = time;
    // console.log('req.body: ', req.body);
    let product = new Product(req.body);

    console.log("new product: ", product);
    try {
      product = await product.save();
      console.log(`${area} CREATE API Result: `, product);
      res.status(200).send({ message: `Succeed to create ${area}`, data: product });
    } catch (err) {
      console.log(`${area} GET API Error: `, err.message);
      res.status(500).send({ message: `Error create ${area}`, error: err });
    }
  }
);

// API - PUT update existing product information - /product/update/:id
router.put(
  "/update/:id",
  checkRole(['manager', 'seller']),
  async (req, res) => {
    let time = Date.now();
    req.body.time = time;
    const { id } = req.params;
    let updates = req.body;
    // console.log('req.body: ', updates);

    try {
      let product = await Product.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

      if (!product) {
        return res.status(404).send({ message: 'No product found' });
      }

      console.log(`${area} UPDATE API Result: `, product);
      res.status(200).send({ message: `Succeed to update ${area}`, data: product });
    } catch (err) {
      console.log(`${area} UPDATE API Error: `, err.message);
      res.status(500).send({ message: `Error update ${area}`, error: err });
    }
  }
);

// API - DELETE delete existing product information - /product/delete/:id
router.delete(
  "/delete/:id",
  checkRole(['manager', 'seller']),
  async (req, res) => {
    let time = Date.now();
    req.body.time = time;
    const { id } = req.params;

    try {
      let product = await Product.findByIdAndDelete(id);

      if (!product) {
        return res.status(404).send({ message: 'No product found or already deleted' });
      }

      console.log(`${area} DELETE API Result: Product deleted successfully`);
      res.status(200).send({ message: `Succeed to delete ${area}`, data: product });
    } catch (err) {
      console.log(`${area} DELETE API Error: `, err.message);
      res.status(500).send({ message: `Error delete ${area}`, error: err });
    }
  }
);

module.exports = router;
