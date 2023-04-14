const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  costPrice: { type: Number, required: true },
  sellPrice: { type: Number, required: true },
});

module.exports = mongoose.model("SellBuy", dataSchema);
