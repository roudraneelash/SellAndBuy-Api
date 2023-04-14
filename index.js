// Load environment variables from a .env file
require("dotenv").config();

const express = require("express");
const SellAndBuyRoutes = require("./routes/SellAndBuy");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// Log a message when the database connection is successfully established
db.once("connected", () => {
  console.log("db connected");
});
// Log any errors that occur during the database connection process
db.on("error", (error) => {
  console.log(error);
});

app.get("/", (req, res) => {
  res.send("Rest Api for SELL and BUY products");
});
app.use("/sellProduct", SellAndBuyRoutes);

app.listen(port, () => {
  console.log(`server is up  and running on port ${port}`);
});
