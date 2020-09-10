import React, { useState, useEffect } from "react";
import Period from "./models/Period";
import Report from "./models/Report";
import css from "./index.css";
import M from "materialize-css";
import moment from "moment";
import CardsTransactions from "./models/transactions/CardsTransactions";
import ModalCreate from "./models/modal/ModalCreate";
import Axios from "axios";
import InputSearch from "./models/transactions/InputSearch";

export default function App() {
  const [months, setMonths] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format("yyyy-MM")
  );

  const [report, setReport] = useState({
    lancamentos: null,
    receitas: 0,
    despesas: 0,
    saldo: 0,
    lancamentos: [],
  });

  const retrieveReport = async () => {
    const reportRetrieve = await fetch(
      "http://localhost:3001/api/transaction?period=" + selectedMonth
    );

    setReport(await reportRetrieve.json());
  };

  const updateReport = async (text) => {
    console.log(text);
    const reportRetrieve = await fetch(
      "http://localhost:3001/api/transaction?period=" + selectedMonth
    );

    let oldReport = await reportRetrieve.json();

    oldReport.lancamentos = oldReport.lancamentos.filter((transaction) => {
      return transaction.description.toLowerCase().includes(text);
    });

    setReport(oldReport);
  };

  const initModal = () => {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, {});
  };

  useEffect(() => {
    const start = async () => {
      await retrievePeriod();
      await retrieveReport();
      initModal();
    };
    start();
  }, []);

  useEffect(() => {
    const update = async () => {
      await retrieveReport();
    };
    update();
  }, [selectedMonth]);

  const initPushpin = () => {
    // document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll(".pushpin");
    var instances = M.Pushpin.init(elems, {});
    // });
  };

  const retrievePeriod = async () => {
    const res = await fetch("http://localhost:3001/api/transaction/months");
    const monthsJson = await res.json();

    setMonths(
      await monthsJson.map((value) => {
        return { period: value };
      })
    );
  };

  const handleSelectedMonth = async (event) => {
    setSelectedMonth(event);
    // await retrieveReport();
  };

  const handleSearch = async (text) => {
    await updateReport(text);
  };

  return (
    <div>
      <div>
        <div>
          <h2 className="center-align">Desafio Final</h2>
        </div>
        <div
          className="container valign-wrapper"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div className="vertical-align">
            <button data-target="modalCreate" class="btn modal-trigger">
              Novo
            </button>
            <ModalCreate />
          </div>
          <InputSearch handleSearch={handleSearch} />
        </div>
        <div className="container">
          {months !== 0 && (
            <Period
              months={months}
              selectedMonth={selectedMonth}
              handleSelectedMonth={handleSelectedMonth}
              report={report}
            />
          )}
        </div>
      </div>
      <div>
        <div id="1" className="container ">
          {/* {report.lancamentos && ( */}
          <CardsTransactions transactions={report.lancamentos} />
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
