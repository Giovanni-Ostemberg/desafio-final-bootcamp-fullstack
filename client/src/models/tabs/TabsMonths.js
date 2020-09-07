import React from "react";

export default function TabsMonths({ months }) {
  console.log(months);
  return months.map((month) => {
    return <li month={month.value}>{month.value}</li>;
  });
}
