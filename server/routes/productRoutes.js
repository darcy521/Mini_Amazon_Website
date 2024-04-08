const express = require("express");
const Product = require("../models/product");
let area = 'Product';

// recordRoutes is an instance of the express router.
// we use it to define our routes.
// The router will be added as a middleware and will take control of requests
const router = express.Router();

// This help convert the id from string to ObjectId for the _id.
// const ObjectId = require("mongodb").ObjectId;

// API - GET get product information
router.get("/", async (req, res) => {
  try {
    let product = await Product.find({});
    console.log(`${area} GET API Result: `, product);
    res.status(200).send(product);
  } catch (err) {
    console.log(`${area} GET API Error: `, err.message);
    res.status(500).send(err);
  }
})

// API - POST create new product
router.post(
  "/create",
  // isAuth,
  // isAdmin,
  async (req, res) => {
    let time = Date.now();
    req.body.time = time;
    console.log('req.body: ', req.body);
    let product = new Product(req.body);

    console.log("new product: ", product);
    try {
      product = await product.save();
      console.log(`${area} CREATE API Result: `, product);
      res.status(200).send(product);
    } catch (err) {
      console.log(`${area} GET API error: `, err.message);
      res.status(500).send(err);
    }
  })

// API - PUT update existing product information
router.put(
  "/update:id",
  // isAuth,
  // isAdmin,
  async(req, res) => {
    let time = Date.now();
    req.body.time = time;
    const { id } = req.params;
    let updates = req.body;
    console.log('req.body: ', updates);
    
    try {
      let product = await Product.findByIdAndUpdate(id, updates, { new:true, runValidators: true});
      console.log(`${area} UPDATE API Result: `, product);
      res.status(200).send(product);
    } catch (err) {
      console.log(`${area} UPDATE API error: `, err.message);
      res.status(500).send(err);
    }
  }

  // expressAsyncHandler(async (req, res) => {
  //   let db_connect = dbo.getDb();
  //   let productId = { _id: req.params.id };
  //   let newValues = {
  //     $set: {
  //       name: req.body.name,
  //       slug: req.body.slug,
  //       price: req.body.price,
  //       image: req.body.image,
  //       images: req.body.images,
  //       category: req.body.category,
  //       brand: req.body.brand,
  //       quantity: req.body.quantity,
  //       description: req.body.description,
  //     }
  //   }
  //   db_connect.collection("products").updateOne(productId, newValues);
  //   res.send({ message: "Product updated", newValues });
  // })
)

// // This section will help you get a list of all the records.
// productRoutes.route("/record").get(function (req, res) {
//   let db_connect = dbo.getDb("mini_amazon");
//   db_connect
//     .collection("products")
//     .find({})
//     .toArray(function (err, result) {
//       if (err) {
//         throw err;
//       }
//       res.json(result);
//     })
// })

// // This section will help you get a single record by id
// productRoutes.route("/record/:id").get(function (req, res) {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId(req.params.id) };
//   db_connect
//     .collection("records")
//     .findOne(myquery, function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     })
// })



module.exports = router;
