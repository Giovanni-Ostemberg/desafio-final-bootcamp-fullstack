import React, { useEffect, useState } from "react";
import M from "materialize-css";
import Report from "./Report";
import moment from "moment";

export default function Period({
  months,
  selectedMonth,
  handleSelectedMonth,
  report,
}) {
  // const [selectedMonth, setSelectedMonth] = useState(
  //   moment().format("yyyy-MM")
  // );

  useEffect(() => {
    const tabs = document.querySelector(".tabs");

    var instance = M.Tabs.init(tabs, {
      // swipeable: true,
    });
  }, [selectedMonth]);

  const slideLeft = () => {
    document.getElementById("tabs").scrollLeft += 40;
  };

  const slideRight = () => {
    document.getElementById("tabs").scrollLeft -= 40;
  };

  const handleSelectedMonthChange = (event) => {
    handleSelectedMonth(event.target.textContent);
  };

  useEffect(() => {
    document.getElementById("tab_" + selectedMonth).click();
    // document.getElementById("tabs").scrollLeft +=
    //   document.getElementById("tab_" + selectedMonth).getBoundingClientRect()
    //     .left - 250;
  }, [selectedMonth]);

  return (
    <div style={{ width: "100%" }}>
      <div className="col s12" style={{ display: "flex", width: "100%" }}>
        <button
          onClick={slideRight}
          className="waves-effect waves-teal btn-flat"
          id="button-right"
        >
          <i className="material-icons">arrow_back</i>
        </button>
        <ul className="tabs" id="tabs" style={{ overflow: "hidden" }}>
          {months.map((month) => {
            return (
              <li key={month.period.value} className="tab col s3">
                <a
                  id={"tab_" + month.period.value}
                  href="#1"
                  onClick={handleSelectedMonthChange}
                  value={month.period.value}
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

      <div id="1" className="col s12" style={{ height: "fit-content" }}>
        <Report month={selectedMonth} report={report} />
      </div>
    </div>
  );
}
