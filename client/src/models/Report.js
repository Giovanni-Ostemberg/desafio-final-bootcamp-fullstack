import React, { useEffect, useState } from "react";
import CardsTransactions from "./transactions/CardsTransactions";

export default function Report({ month, report }) {
  return (
    <div
      className="container"
      style={{ height: "fit-content", overflow: "auto" }}
    >
      <div className="container">
        <table className="responsive-table">
          <thead>
            <tr>
              <th className="center-align">Lançamentos</th>
              <th className="center-align ">Receitas</th>
              <th className="center-align">Despesas</th>
              <th className="center-align">Saldo</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="center-align">{report.qtd}</td>
              <td className="center-align green-text">{report.receita}</td>
              <td className="center-align red-text">{report.despesas}</td>
              <td
                className={
                  "center-align " + (+report.receita > +report.despesas)
                    ? "green-text"
                    : "red-text"
                }
              >
                {report.saldo}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        className="container"
        style={{ height: "fit-contentf", overflow: "auto" }}
      >
        {/* {report.lancamentos && (
          <CardsTransactions transactions={report.lancamentos} />
        )} */}
      </div>
    </div>
  );
}
