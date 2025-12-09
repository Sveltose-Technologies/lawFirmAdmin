import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ProfitChart = () => {
  const chartoptions = {
    series: [
      {
        name: "Previous",
        data: [100, 600, 5500, 3000, 200],
      },
      {
        name: "Current",
        data: [600, 5500, 3200, 200, 1300],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 250, // Yahan height kam kar di hai (350 -> 250)
        toolbar: { show: false },
      },
      colors: ["#eebb5d", "#eebb5d"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          borderRadius: 4,
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Sat"],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: "#a1aab2" } },
      },
      yaxis: { labels: { style: { colors: "#a1aab2" } } },
      fill: { opacity: 1 },
      tooltip: { theme: "dark" },
      legend: { position: "bottom", markers: { radius: 12 } },
      grid: { borderColor: "#f1f1f1" },
    },
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h5" style={{ borderLeft: "4px solid #c6a87c", paddingLeft: "10px", fontWeight: "bold" }}>
          Profit Earned
        </CardTitle>
        <div className="mt-4">
          <Chart
            options={chartoptions.options}
            series={chartoptions.series}
            type="bar"
            height="250" // Yahan bhi height update karni padegi
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfitChart;