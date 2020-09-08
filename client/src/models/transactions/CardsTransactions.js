import React from "react";

export default function CardsTransactions({ transactions }) {
  console.log(transactions);
  return (
    <ul className="col s12 m7">
      {transactions.map((transaction) => {
        return (
          <li key={transaction._id}>
            <div className="card horizontal">
              <div className="card-image valign-wrapper">
                <i className="material-icons medium ">trending_up</i>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <p>
                    I am a very simple card. I am good at containing small bits
                    of information.
                  </p>
                </div>
                <div className="card-action">
                  <a href="#">This is a link</a>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
    // </div>
  );
}
