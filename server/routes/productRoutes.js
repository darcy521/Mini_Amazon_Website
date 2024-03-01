const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// recordRoutes is an instance of the express router.
// we use it to define our routes.
// The router will be added as a middleware and will take control of requests
// starting with path /record
const productRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// API - GET get product information
productRoutes.get("/", async (req, res) => {
  let db_connect = dbo.getDb();
  let results = await db_connect.collection("products").find({}).toArray();
  if (!results) res.send("Not found").status(404);
  res.send(results).status(200);
})

// API - POST create new product
productRoutes.post(
  "/",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    let db_connect = dbo.getDb();
    const newProduct = {
        name: req.body.name,
        slug: req.body.slug,
        price: req.body.price,
        image: req.body.image,
        images: req.body.images,
        category: req.body.category,
        brand: req.body.brand,
        quantity: req.body.quantity,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        time: Date.now(),
      };
    // newProduct.name = req.body.name;
    // newProduct.slug = req.body.slug;
    // newProduct.price = req.body.price;
    // newProduct.image = req.body.image;
    // newProduct.images = req.body.images;
    // newProduct.category = req.body.category;
    // newProduct.brand = req.body.brand;
    // newProduct.quantity = req.body.quantity;
    // newProduct.description = req.body.description;
    // newProduct.slug = req.body.slug;
    // newProduct.rating = req.body.slug;
    // newProduct.numReviews = req.body.numReviews;
    // newProduct.time = Date.now();
    // const product = await newProduct.save();
    console.log("newProduct: ", newProduct);
    // console.log("product: ", product);
    db_connect.collection("test").insertOne(newProduct)
    .then((result) => {
        result.acknowledged ?
          res.send({ message: 'Product created!', newProduct })
          && console.log("Product created!")
          :
          res.send({ message: 'Failed to create product!', newProduct })
      }
    );
  })
);

// API - PUT update existing product information
productRoutes.put(
  "/:id",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    let db_connect = dbo.getDb();
    let productId = { _id: req.params.id };
    let newValues = {
      $set: {
        name: req.body.name,
        slug: req.body.slug,
        price: req.body.price,
        image: req.body.image,
        images: req.body.images,
        category: req.body.category,
        brand: req.body.brand,
        quantity: req.body.quantity,
        description: req.body.description,
      }
    }
    db_connect.collection("products").updateOne(productId, newValues);
    res.send({ message: "Product updated", newValues });
  })
)

// This section will help you get a list of all the records.
productRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("mini_amazon");
  db_connect
    .collection("products")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        throw err;
      }
      res.json(result);
    })
})

// This section will help you get a single record by id
productRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("records")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    })
})



module.exports = productRoutes;
