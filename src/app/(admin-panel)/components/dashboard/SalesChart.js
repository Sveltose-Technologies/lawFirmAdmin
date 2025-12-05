import React from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesChart = () => {
  // ----------------------------------------------------------------------
  // 1. LEFT SIDE: Revenue Analytics (Line Chart - Purple)
  // ----------------------------------------------------------------------
  const revenueOptions = {
    series: [
      {
        name: "Appointments",
        data: [32, 28, 22, 15, 8, 3, 2.5, 3], 
      },
    ],
    options: {
      chart: {
        type: "line",
        toolbar: { show: false },
      },
      colors: ["#9b59b6"], // Purple Color
      dataLabels: { enabled: false },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      xaxis: {
        categories: ["Jul", "Jul-End", "Aug-Start", "Aug-Mid", "Aug-End", "Sep", "Oct", "Nov"],
        labels: { style: { colors: "#a1aab2" } },
      },
      yaxis: {
        title: { text: "Appointments", style: { color: "#a1aab2" } },
        labels: { style: { colors: "#a1aab2" } },
        min: 0,
      },
      grid: {
        borderColor: "rgba(0,0,0,0.1)",
        strokeDashArray: 3,
      },
      tooltip: { theme: "dark" },
    },
  };

  // ----------------------------------------------------------------------
  // 2. RIGHT SIDE: Case Analytics (Donut Chart - Gold/Brown)
  // ----------------------------------------------------------------------
  const caseOptions = {
    series: [22.22, 11.11, 22.22], 
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Pending", "Ongoing", "Success"],
      colors: ["#c6a87c", "#a0855b", "#8d6e63"], // Gold/Brown Shades
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: { show: false },
          },
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["#fff"] },
      legend: {
        show: true,
        position: "bottom",
        markers: { radius: 12 },
        itemMargin: { horizontal: 5, vertical: 5 },
      },
      tooltip: { theme: "dark" },
    },
  };

  return (
    <Row>
      
      {/* --- REVENUE ANALYTICS (Left Side) --- */}
      <Col xs="12" lg="8">
        <Card className="mb-4">
          <CardBody>
            <CardTitle tag="h5" style={{ borderLeft: "4px solid #c6a87c", paddingLeft: "10px", fontWeight: "bold" }}>
              Revenue Analytics
            </CardTitle>
            <div className="mt-4">
              <Chart
                options={revenueOptions.options}
                series={revenueOptions.series}
                type="line"
                height="350"
                width="100%"
              />
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* --- CASE ANALYTICS (Right Side) --- */}
      <Col xs="12" lg="4">
        <Card className="mb-4">
          <CardBody>
            <CardTitle tag="h5" style={{ borderLeft: "4px solid #c6a87c", paddingLeft: "10px", fontWeight: "bold" }}>
              Case Analytics
            </CardTitle>
            <div className="mt-4 d-flex justify-content-center">
              <Chart
                options={caseOptions.options}
                series={caseOptions.series}
                type="donut"
                height="350"
                width="100%"
              />
            </div>
          </CardBody>
        </Card>
      </Col>
      
    </Row>
  );
};

export default SalesChart;