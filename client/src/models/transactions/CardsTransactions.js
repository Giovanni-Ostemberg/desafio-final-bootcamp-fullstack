import React from "react";
import css from "./cards.module.css";

export default function CardsTransactions({ transactions }) {
  let i = 0;
  const moneyFormat = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  console.log(transactions);
  return (
    <ul className="col s12 m7" id={css.cardContainer}>
      {transactions.map((transaction) => {
        return (
          <li key={transaction._id} className={css.cardList}>
            <div className="card horizontal">
              <div
                className={
                  "card-image valign-wrapper" +
                  (transaction.category === "Receita"
                    ? " teal accent-3"
                    : " pink accent-3 white-text")
                }
                id={css.cardImage}
              >
                {transaction.category === "Receita" ? (
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
                  </ul>
                </div>
                <div className="card-action"></div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
    // </div>
  );
}
