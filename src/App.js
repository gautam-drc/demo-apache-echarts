import React from "react";
import ReactECharts from "echarts-for-react";
import { color } from "echarts";

const kpis = [
  { title: "Daily Active Learners", value: 459, change: "+8%" },
  { title: "Coding Hours (7d)", value: 934, change: "+12%" },
  { title: "Assessment Pass Rate", value: "84%", change: "+3%" },
  { title: "Avg Time / Learner", value: "1.7h", change: "+5%" },
];

// ------- ECharts Options -------

// Donut Chart
const skillsOption = {
  title: { text: "Skills Distribution", left: "center" },
  tooltip: { trigger: "item" },
  series: [
    {
      type: "pie",
      radius: ["40%", "70%"],
      data: [
        { value: 29, name: "Frontend" },
        { value: 12, name: "Backend" },
        { value: 14, name: "Data/AI" },
        { value: 17, name: "Cloud" },
        { value: 20, name: "Leadership" },
      ],
    },
  ],
};

// Radar Chart
const radarOption = {
  title: {
    text: "Proficiency Radar",
    left: "center",
    top: 10  // move title down a bit if needed
  },
  tooltip: { trigger: "item" },
  radar: {
    center: ["50%", "60%"], // shift radar lower
    radius: "65%",          // control size
    indicator: [
      { name: "Frontend", max: 100 },
      { name: "Backend", max: 100 },
      { name: "Data/AI", max: 100 },
      { name: "Cloud", max: 100 },
      { name: "Leadership", max: 100 },
    ],
  },
  series: [
    {
      type: "radar",
      data: [
        { value: [80, 70, 65, 60, 50], name: "Score" }
      ],
      areaStyle: { opacity: 0.2 },
    },
  ],
};

// Line Chart
const trendOption = {
  title: { text: "Learning Hours Trend" },
  tooltip: { trigger: "axis" },
  legend: { data: ["Hours", "Active"], orient: "horizontal", bottom: 0 },
  xAxis: {
    type: "category",
    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    splitLine: { show: true }   // vertical grid lines
  },
  yAxis: {
    type: "value",
    splitLine: { show: true }   // horizontal grid lines (default is true anyway)
  },
  series: [
    { name: "Hours", type: "line", data: [600, 700, 750, 800, 900, 1000] },
    { name: "Active", type: "line", data: [400, 450, 480, 510, 550, 600] },
  ],
};


// Bar Chart
const deptOption = {
  title: { text: "Completion by Department" },
  tooltip: { trigger: "axis" },
  legend: { data: ["Completed", "InProgress"], orient: "horizontal", bottom: 0 },
  xAxis: {
    type: "category",
    data: ["Eng", "Product", "Ops", "Fin/HR", "Sales"],
    splitLine: {
      show: true,
      lineStyle: { color: "#eee", type: "dashed" }  // vertical lines style
    }
  },
  yAxis: {
    type: "value",
    splitLine: {
      show: true,
      lineStyle: { color: "#eee", type: "dashed" }  // horizontal lines style
    }
  },
  series: [
    { name: "Completed", type: "bar", data: [240, 90, 170, 120, 140] },
    { name: "InProgress", type: "bar", data: [80, 90, 50, 30, 50] },
  ],
};


// Heatmap (Weekly Engagement)
const hours = ["9 AM", "12 PM", "3 PM", "6 PM", "9 PM", "12 AM"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let data = [];
for (let i = 0; i < hours.length; i++) {
  for (let j = 0; j < days.length; j++) {
    data.push([j, i, Math.floor(Math.random() * 100)]);
  }
}
const heatmapOption = {
  title: { text: "Engagement Heatmap" },
  tooltip: { position: "top" },
  xAxis: { type: "category", data: days },
  yAxis: { type: "category", data: hours },
  visualMap: { 
    min: 0, 
    max: 100, 
    calculable: true, 
    orient: "horizontal", 
    left: "center",
    inRange: {
      color: ["#e0f2fe", "#3b82f6", "#1e3a8a"]  
      // light blue → medium blue → dark blue
    }
  },
  series: [
    {
      type: "heatmap",
      data,
      label: { show: false },
      emphasis: { 
        // itemStyle: { 
        //   shadowBlur: 0, 
        //   shadowColor: "rgba(0,0,0,0)" 
        // } 
      },
      itemStyle: {
        borderWidth: 10,
        borderRadius: 10,
        borderType: "solid",
        borderColor: "#ffffff"
      }
    }
  ]
};



// Bar Chart (Peak Hours)
const peakOption = {
  title: { text: "Peak Active Hours" },
  tooltip: { data: "Enganement", orient: "horizontal", bottom: 0 },
  xAxis: { type: "category", data: ["9 AM", "12 PM", "3 PM", "6 PM", "9 PM", "12 AM"] },
  yAxis: { type: "value" },
  series: [
    { name: "Engagement", type: "bar", data: [70, 130, 110, 145, 110, 50] },
  ],
};

function App() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      <p className="text-gray-500 mb-6">Admin overview of organization learning performance and engagement</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi) => (
          <div key={kpi.title} className="bg-white shadow p-4 rounded-2xl">
            <h3 className="text-sm text-gray-500">{kpi.title}</h3>
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className="text-green-600">{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div style={{ padding: "20px", marginBottom: "20px", background: "#fff", borderRadius: "8px" }}>
          <ReactECharts option={peakOption} style={{ height: "350px" }} />
        </div>

        <div style={{ padding: "20px", marginBottom: "20px", background: "#fff", borderRadius: "8px" }}>
          <ReactECharts option={heatmapOption} style={{ height: "350px" }} />
        </div>

        <div style={{ padding: "20px", marginBottom: "20px", background: "#fff", borderRadius: "8px" }}>
          <ReactECharts option={trendOption} style={{ height: "300px" }} />
        </div>

        <div style={{ padding: "20px", marginBottom: "20px", background: "#fff", borderRadius: "8px" }}>
          <ReactECharts option={deptOption} style={{ height: "300px" }} />
        </div>

        <div style={{ padding: "20px", marginBottom: "20px", background: "#fff", borderRadius: "8px" }}>
          <ReactECharts option={skillsOption} style={{ height: "300px" }} />
        </div>

        <div style={{ padding: "20px", marginBottom: "20px", background: "#fff", borderRadius: "8px" }}>
          <ReactECharts option={radarOption} style={{ height: "300px" }} />
        </div>

      </div>
    </div>
  );
}

export default App;
