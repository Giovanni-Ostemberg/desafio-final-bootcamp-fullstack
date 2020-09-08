const express = require("express");
const cors = require("cors");
const moment = require("moment");
const transactionModel = require("../models/TransactionModel");
const app = express();

app.use(cors());
app.use(express.json());
const patternDate = /[0-9]{4}/;

// Retrieve
app.get("/", async (req, res) => {
  try {
    if (!req.query.period) {
      throw new Error("Favor informar o período");
    }
    const period = req.query.period.split("-");
    const testPeriod =
      period[0] >= 2019 &&
      period[0] <= 2021 &&
      period[1] >= 0 &&
      period[1] <= 12;
    const transactions = await transactionModel.find({
      yearMonth: req.query.period,
    });
    const count = await transactionModel.count({
      yearMonth: req.query.period,
    });
    const receita = await transactionModel.aggregate([
      { $match: { yearMonth: req.query.period, category: "Receita" } },
      { $group: { _id: null, total: { $sum: "$value" } } },
    ]);
    const despesas = await transactionModel.aggregate([
      {
        $match: { yearMonth: req.query.period, category: { $ne: "Receita" } },
      },
      { $group: { _id: null, total: { $sum: "$value" } } },
    ]);
    const report = {
      qtd: count,
      receita: receita[0].total,
      despesas: despesas[0].total,
      saldo: receita[0].total - despesas[0].total,
      lancamentos: [...transactions],
    };

    testPeriod
      ? res.send(report)
      : res.send(
          "é necessário informar o parâmetro period, no formato yyyy-mm e válido ao periodo de 36 meses"
        );
  } catch (error) {
    res.status(500).send("Falha ao buscar registros: " + error);
  }
});

// Retrieve All Months
app.get("/months", async (req, res) => {
  try {
    let months = await transactionModel.distinct("yearMonth");
    months = months.map((month) => {
      return { value: month };
    });
    res.send(months);
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
