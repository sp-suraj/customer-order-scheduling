import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);
Chart.register(...registerables);

const getRecordsBetweenTime = (dates, dateString, fromTime, toTime) =>
  dates.filter((item) => {
    return (
      new Date(`${dateString} ${toTime}`) > new Date(item.schedule_time) &&
      new Date(`${dateString} ${fromTime}`) < new Date(item.schedule_time)
    );
  });
function ChartByTime({ daywise, label }) {
  const dateString = label;
  const timeLapData1 = getRecordsBetweenTime(
    daywise,
    dateString,
    "09:00:00",
    "12:00:00"
  );
  const timeLapData2 = getRecordsBetweenTime(
    daywise,
    dateString,
    "12:00:00",
    "15:00:00"
  );
  const timeLapData3 = getRecordsBetweenTime(
    daywise,
    dateString,
    "15:00:00",
    "18:00:00"
  );
  const timeLapData4 = getRecordsBetweenTime(
    daywise,
    dateString,
    "18:00:00",
    "21:00:00"
  );
  const timeLapData5 = getRecordsBetweenTime(
    daywise,
    dateString,
    "21:00:00",
    "24:00:00"
  );
  const timeLapData6 = getRecordsBetweenTime(
    daywise,
    dateString,
    "00:00:00",
    "03:00:00"
  );
  const timeLapData7 = getRecordsBetweenTime(
    daywise,
    dateString,
    "03:00:00",
    "06:00:00"
  );
  const timeLapData8 = getRecordsBetweenTime(
    daywise,
    dateString,
    "06:00:00",
    "09:00:00"
  );

  const chartData = {
    labels: [
      "9am-12am",
      "12am-3pm",
      "3pm-6pm",
      "6pm-9pm",
      "9pm-12pm",
      "12pm-3am",
      "3am-6am",
      "6am-9am",
    ],
    datasets: [
      {
        label: "Number of shedules",
        data: [
          timeLapData1.length,
          timeLapData2.length,
          timeLapData3.length,
          timeLapData4.length,
          timeLapData5.length,
          timeLapData6.length,
          timeLapData7.length,
          timeLapData8.length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 285, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(201, 203, 207, 0.5)",
          "rgba(90, 100, 150, 0.5)",
        ],
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          beginAtZero: false,
        },
      ],
    },
    plugins: {
      title: {
        display: true,
        text: `Number of schedules on ${label}`,
      },
      legend: {
        display: false,
      },
      datalabels: {
        color: "blue",
        offset: 4,
        labels: {
          title: {
            font: {
              weight: "bold",
            },
          },
        },
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default ChartByTime;
