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

  return (
    <div className="row">
      <div className="col s12">
        <ul className="tabs" id="tabs">
          {months.map((month) => {
            return (
              <li key={month.period.value} className="tab col s3">
                <a href={"#" + month.period.value}>{month.period.value}</a>
              </li>
            );
          })}
        </ul>
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
