const express = require("express");
const cors = require("cors");
const moment = require("moment");
const transactionModel = require("../models/TransactionModel");
const app = express();

app.use(express.json());
app.use(cors());
const patternDate = /[0-9]{4}/;

// Retrieve
app.get("/", async (req, res) => {
  const period = req.query.period.split("-");
  const testPeriod =
    period[0] >= 2019 && period[0] <= 2021 && period[1] >= 0 && period[1] <= 12;
  try {
    const transactions = await transactionModel.find({
      yearMonth: req.query.period,
    });
    testPeriod
      ? res.send(transactions)
      : res.send(
          "é necessário informar o parâmetro period, no formato yyyy-mm e válido ao periodo de 36 meses"
        );
  } catch (error) {
    res.status(500).send("Falha ao buscar registros: " + error);
  }
});

//Delete
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const transaction = await transactionModel.findByIdAndDelete({ _id: id });
    transaction ? res.send(transaction) : res.send("Registro não encontrado");
  } catch (error) {
    res.status(500).send("Não foi possível remover o registro: " + error);
  }
});

//Update
app.put("/update", async (req, res) => {
  const { transaction } = req.body;
  const id = transaction._id;

  try {
    const updatedTransaction = await transactionModel.findByIdAndUpdate(
      { _id: id },
      transaction,
      {
        new: true,
      }
    );
    updatedTransaction
      ? res.send(updatedTransaction)
      : res.send("Registro não encontrada!");
  } catch (error) {
    res.status(500).send("Não foi possível atualizar o registro: " + error);
  }
});

//Create
app.post("/create", async (req, res) => {
  const { transaction } = req.body;
  const id = transaction._id;
  try {
    const createdTransaction = new transactionModel(transaction);
    await createdTransaction.save();

    res.send(createdTransaction);
  } catch (error) {
    res.status(500).send("Não foi possível criar o registro: " + error);
  }
});

module.exports = app;
