/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Box } from "@chakra-ui/react";

export default () => {
  const ref = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let resizer : any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = [] as any;
  let currentTime = new Date("2024-05-01T00:00:00"); // Start time
  const endTime = new Date(currentTime.getTime() + 14 * 60 * 60 * 1000); // End time (14 hours later)

  while (currentTime <= endTime) {
    data.push({
      time: currentTime.toTimeString().substr(0, 5), // Format the time as HH:MM
      critical: Math.floor(Math.random() * 10), // Random critical errors
      uncritical: Math.floor(Math.random() * 20), // Random uncritical errors
    });
    currentTime = new Date(currentTime.getTime() + 10 * 60 * 1000); // Increment by 10 minutes
  }
  useEffect(() => {
    if (ref.current) {
      const chartDom = ref.current;
      const myChart = echarts.init(chartDom);

      // Define the option
      const option = {
        title: {
          text: "Technical errors effecting customer experence",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["Critical", "Uncritical"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: data.map((item) => item.time),
          axisLabel: {
            interval: 7, // Display every 7th label for better readability
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Critical",
            type: "bar",
            stack: "errors",
            itemStyle: {
              color: "red", // Bright red color for critical errors
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: data.map((item : any) => item.critical),
          },
          {
            name: "Uncritical",
            type: "bar",
            stack: "errors",
            itemStyle: {
              color: "orange", // Orange color for uncritical errors
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: data.map((item : any) => item.uncritical),
          },
        ],
      };

      // Set the option
      myChart.setOption(option);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      resizer = () => {
        myChart.resize();
      };

      window.addEventListener("resize", resizer);
    }
    return () => {
      window.removeEventListener("resize", resizer);
    };
    
  }, [data]);

  return <Box ref={ref} style={{ height: "250px" }} p={"0.8rem"} />;
};
