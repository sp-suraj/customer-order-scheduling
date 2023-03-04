import React, { useState } from "react";
import ChartByDate from "./Charts/ChartByDate";
import shedules from "../data.json";
import ChartByTime from "./Charts/ChartByTime";
import moment from "moment/moment";
import classes from "./ChartActions.module.css";

function minimumDate(date) {
  let dt = new Date(date);
  let newDt = new Date(dt.setDate(dt.getDate() + 2));
  return moment(newDt).format("YYYY-MM-DD");
}
let minDate = minimumDate(shedules[0].item_date);
let maxDate = shedules[shedules.length - 1].item_date;
var selectedDate, firstDate, secondDate, thirdDate;
var oneDay, label, twoDay, threeDay;

const getDateRecord = (data, date) =>
  data.filter((item) => {
    return item.schedule_time.split(" ")[0] === date;
  });

oneDay = getDateRecord(shedules, "2021-11-20");
twoDay = getDateRecord(shedules, "2021-11-19");
threeDay = getDateRecord(shedules, "2021-11-18");

const reduceDateByOne = (date) => {
  let dt = new Date(date);
  let newDt = new Date(dt.setDate(dt.getDate() - 1));
  return moment(newDt).format("YYYY-MM-DD");
};

const ChartActions = () => {
  const [isDate, setIsDate] = useState(true);
  const [selected, setSelected] = useState(true);

  const selectHandler = (e) => {
    selectedDate = e.target.value;
    firstDate = reduceDateByOne(selectedDate);
    secondDate = reduceDateByOne(firstDate);
    thirdDate = reduceDateByOne(secondDate);
    if (selectedDate) {
      oneDay = getDateRecord(shedules, firstDate);
      twoDay = getDateRecord(shedules, secondDate);
      threeDay = getDateRecord(shedules, thirdDate);
    }
    selected ? setSelected(false) : setSelected(true);
    setIsDate(true);
  };

  const changeGraphHandler = () => {
    setIsDate(true);
  };

  const barClickHandler = (e) => {
    var points = e.chart.getElementsAtEventForMode(
      e,
      "nearest",
      { intersect: true },
      true
    );
    if (points.length) {
      const firstPoint = points[0];
      label = e.chart.data.labels[firstPoint.index];
    }
    setIsDate(false);
  };
  const data = oneDay ? [oneDay.length, twoDay.length, threeDay.length] : "";
  const labels = oneDay
    ? [
        oneDay[0].schedule_time.split(" ")[0],
        twoDay[0].schedule_time.split(" ")[0],
        threeDay[0].schedule_time.split(" ")[0],
      ]
    : "";

  return (
    <div style={{ marginLeft: "50px" }}>
      <button disabled={isDate} onClick={changeGraphHandler}>
        Back
      </button>
      <input
        type="date"
        style={{ marginLeft: "10px" }}
        min={minDate}
        max={maxDate}
        onSelect={selectHandler}
      />
      <div
        style={{
          margin: "5px",
          width: "80%",
        }}
      >
        {isDate ? (
          <ChartByDate
            data={data}
            labels={labels}
            clickHandler={barClickHandler}
          />
        ) : (
          <ChartByTime daywise={shedules} label={label} />
        )}
      </div>
    </div>
  );
};

export default ChartActions;
