import React, { useState, useEffect } from "react";
import Period from "./models/Period";
import Report from "./models/Report";

export default function App() {
  const [months, setMonths] = useState(0);

  useEffect(async () => {
    const start = async () => {
      await retrievePeriod();
      await printMonths();
    };
    start();
  }, []);

  const retrievePeriod = async () => {
    const res = await fetch("http://localhost:3001/api/transaction/months");
    const monthsJson = await res.json();

    setMonths(
      await monthsJson.map((value) => {
        return { period: value };
      })
    );
  };

  const printMonths = async () => {
    console.log(months);
  };

  return (
    <div>
      <div>
        <h2 className="center-align">Desafio Final do Bootcamp Full Stack</h2>
      </div>
      <div>{months !== 0 ? <Period months={months} /> : <span>Wait</span>}</div>
      <div>
        <Report />
      </div>
    </div>
  );
}
