import React, { useEffect, useState } from "react";
import M from "materialize-css";
import TabsMonths from "./tabs/TabsMonths";
import { monthsShort } from "moment";

export default function Period({ months }) {
  useEffect(() => {
    const tabs = document.querySelector(".tabs");

    var instance = M.Tabs.init(tabs, {
      swipeable: true,
    });
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
                <a href={"#" + month.period.value}>{month.period.value}</a>
              </li>
            );
          })}
        </ul>
        <button
          onClick={slideLeft}
          class="waves-effect waves-teal btn-flat"
          id="button-right"
        >
          <i class="material-icons">arrow_forward</i>
        </button>
      </div>
      {months.map((month) => {
        return (
          <div
            id={month.period.value}
            key={month.period.value}
            className="col s12"
          >
            {month.period.value}
          </div>
        );
      })}
    </div>
  );
}
