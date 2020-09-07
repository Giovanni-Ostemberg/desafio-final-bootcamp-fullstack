import React, { useEffect, useState } from "react";
import M from "materialize-css";
import TabsMonths from "./tabs/TabsMonths";
import { monthsShort } from "moment";
import Report from "./Report";
import moment from "moment";

export default function Period({ months }) {
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format("yyyy-MM")
  );

  useEffect(() => {
    const tabs = document.querySelector(".tabs");

    console.log(selectedMonth);

    var instance = M.Tabs.init(tabs, {
      swipeable: true,
    });

    document.getElementById("tab_" + selectedMonth).click();
    document.getElementById("tabs").scrollLeft =
      document.getElementById("tab_" + selectedMonth).getBoundingClientRect()
        .left - 250;
  }, []);

  const slideLeft = () => {
    document.getElementById("tabs").scrollLeft += 40;
  };

  const slideRight = () => {
    document.getElementById("tabs").scrollLeft -= 40;
  };

  return (
    <div className="row">
      <div className="col s12" style={{ display: "flex" }}>
        <button
          onClick={slideRight}
          class="waves-effect waves-teal btn-flat"
          id="button-right"
        >
          <i class="material-icons">arrow_back</i>
        </button>
        <ul className="tabs" id="tabs" style={{ overflow: "hidden" }}>
          {months.map((month) => {
            return (
              <li key={month.period.value} className="tab col s3">
                <a
                  id={"tab_" + month.period.value}
                  href={"#" + month.period.value}
                >
                  {month.period.value}
                </a>
              </li>
            );
          })}
        </ul>
        <button
          onClick={slideLeft}
          className="waves-effect waves-teal btn-flat"
          id="button-right"
        >
          <i className="material-icons">arrow_forward</i>
        </button>
      </div>
      {months.map((month) => {
        return (
          <div
            id={month.period.value}
            key={month.period.value}
            className="col s12"
          >
            <Report />
          </div>
        );
      })}
    </div>
  );
}
