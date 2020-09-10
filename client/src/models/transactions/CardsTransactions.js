import React, { useState } from "react";
import css from "./cards.module.css";
import ModalUpdate from "../modal/ModalUpdate";
import axios from "axios";
import DeleteButton from "./DeleteButton";

export default function CardsTransactions({ transactions }) {
  let i = 0;
  const moneyFormat = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const deleteRegister = async (id) => {
    console.log("Deletando: " + id);
    axios.delete(
      "https://giovanni-desafio-final.herokuapp.com/api/transaction/delete/" +
        id
    );
  };
  return (
    <ul className="col s12 m7" id={css.cardContainer}>
      {transactions.map((transaction) => {
        return (
          <li key={transaction._id} className={css.cardList}>
            <div className="card horizontal">
              <div
                className={
                  "card-image valign-wrapper" +
                  (transaction.type === "+"
                    ? " teal accent-3"
                    : " pink accent-3 white-text")
                }
                id={css.cardImage}
              >
                {transaction.type === "+" ? (
                  <i className="material-icons medium ">trending_up</i>
                ) : (
                  <i className="material-icons medium ">trending_down</i>
                )}
                <span>{++i}</span>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <ul>
                    <li>
                      <b>Categoria:</b> {transaction.category}
                    </li>
                    <li>
                      <b>Descrição:</b> {transaction.description}
                    </li>
                    <li>
                      <b>Valor:</b> {moneyFormat.format(transaction.value)}
                    </li>
                    <li>
                      <b>Data:</b> {transaction.yearMonthDay}
                    </li>
                  </ul>
                </div>
                <div
                  className="card-action"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <button
                    className="btn-flat modal-trigger"
                    data-target={"modalUpdate" + transaction._id}
                  >
                    <i className="material-icons">edit</i>
                  </button>
                  <DeleteButton
                    _id={transaction._id}
                    handleDelete={deleteRegister}
                  />
                </div>
              </div>
              <ModalUpdate
                oldDescription={transaction.description}
                oldCategory={transaction.category}
                oldValue={transaction.value}
                oldDate={transaction.yearMonthDay}
                oldType={transaction.type}
                _id={transaction._id}
              />
            </div>
          </li>
        );
      })}
    </ul>
    // </div>
  );
}
