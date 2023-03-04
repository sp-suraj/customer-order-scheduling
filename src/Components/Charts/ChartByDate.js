import React from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart, registerables } from "chart.js";

Chart.register(ChartDataLabels);
Chart.register(...registerables);

const ChartByDate = (props) => {
  const chartData = {
    labels: props.labels,
    datasets: [
      {
        label: "Number of shedules",
        data: props.data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(201, 203, 207, 0.5)",
        ],
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: true,
    onClick: props.clickHandler,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
    plugins: {
      title: {
        display: true,
        text: "Number of shedules",
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
};

export default ChartByDate;
