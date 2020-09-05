const express = require("express");
const cors = require("cors");
const moment = require("moment");
const transactionModel = require("../models/TransactionModel");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  console.log(req.query.period);

  const testPeriod = new Date(moment(req.query.period).format("yyyy-MM"));
  const day = testPeriod.getYear();
  //   const testYear = testPeriod.getDay();
  //   const transactions = await transactionModel.find({});
  testPeriod
    ? res.send("" + day)
    : res.send("é necessário informar o parâmetro period, no formato yyyy-mm");
});

module.exports = app;
