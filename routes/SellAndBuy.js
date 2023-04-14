const express = require("express");
const router = express.Router();
const SellBuy = require("../mongoose/models/SellBuy");

//get all
router.get("/", async (req, res) => {
  try {
    let query = {};
    if (req.query.product) {
      query.productName = req.query.product;
    }
    let sort = {};
    if (req.query.sortBy === "lowerCostPrice") {
      sort.costPrice = 1;
    } else if (req.query.sortBy === "higherCostPrice") {
      sort.costPrice = -1;
    } else if (req.query.sortBy === "lowerSoldPrice") {
      sort.soldPrice = 1;
    } else if (req.query.sortBy === "higherSoldPrice") {
      sort.soldPrice = -1;
    }

    const sellBuys = await SellBuy.find(query).sort(sort);
    res.status(200).json(sellBuys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//post
router.post("/post", async (req, res) => {
  const { productName, costPrice, sellPrice } = req.body;
  // Checking if productName is valid
  if (productName.length < 4) {
    return res.status(400).json({
      message: "productName should be at least 4 characters long.",
    });
  }

  // Checking if costPrice is valid
  if (costPrice <= 0) {
    return res.status(400).json({
      message: "cost price value cannot be zero or negative",
    });
  }

  // Creating new product document
  const newProduct = new SellBuy({ productName, costPrice, sellPrice });

  try {
    // Saving new product document to the database
    await newProduct.save();
    res.status(201).json({ message: "Product Added" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//patch
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const option = { new: true };
    const updatedData = req.body;

    if (updatedData.soldPrice <= 0) {
      return res.status(400).json({
        message: "sold price value cannot be zero or negative",
      });
    }
    const data = await SellBuy.findByIdAndUpdate(id, updatedData, option);
    res.status(200).json({
      message: "Updated Successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await SellBuy.findByIdAndDelete(id);
    res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;
