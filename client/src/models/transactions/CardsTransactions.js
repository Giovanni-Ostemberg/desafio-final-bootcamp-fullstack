import React from "react";

export default function CardsTransactions({ transactions }) {
  let i = 0;
  console.log(transactions);
  return (
    <ul className="col s12 m7">
      {transactions.map((transaction) => {
        return (
          <li key={transaction._id}>
            <div className="card horizontal">
              <div className="card-image valign-wrapper">
                <i className="material-icons medium ">trending_up</i>
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
                      <b>Valor:</b> {transaction.value}
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
