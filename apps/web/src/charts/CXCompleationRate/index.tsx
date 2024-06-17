import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import * as echarts from "echarts";

const StackedBarChart = () => {
  const chartRef = useRef(null);

  const generateRandomData = () => {
    const generateArray = () =>
      Array.from({ length: 48 }, () => Math.floor(Math.random() * 100));
    return {
      exit: generateArray(),
      completed: generateArray(),
    };
  };

  const data = generateRandomData();

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const options = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        legend: {
          data: ["Exit", "Completed"],
          bottom: 24, // Legend at the bottom with padding
        },
        grid: {
          left: 24,
          right: 24,
          top: 24,
          bottom: 48, // 24px padding plus space for the legend
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: Array.from({ length: 48 }, (_, i) => (i + 1).toString()), // Auto-generated categories 1 to 48
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Completed",
            type: "bar",
            stack: "total",
            data: data.completed,
            itemStyle: { color: "green" },
          },
          {
            name: "Exit",
            type: "bar",
            stack: "total",
            data: data.exit,
            itemStyle: { color: "red" },
          },
        ],
      };

      chartInstance.setOption(options);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [data]);

  return <Box ref={chartRef} width="100%" height="400px" />;
};

export default StackedBarChart;
