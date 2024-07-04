/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Box, border } from "@chakra-ui/react";
import { NavigationDispatcherContext } from "../../NavigationContext";
import { useHTTP } from "../../uitls/useHTTP";
import { useSearchParams } from "react-router-dom";

const HeatmapChart = ({ from, to }) => {
  const ref = useRef(null);
  let resizer;

  const dispatchDrawerState = useContext(NavigationDispatcherContext);

  const { data: unfilterndData, error } = useHTTP(`/health?from=${from}`);

  const [searchParams, setSearchParams] = useSearchParams();

  const charInstance = useRef<any>(null);

  useEffect(() => {
    if (ref.current && unfilterndData && charInstance.current! == null) {
      const data =
        unfilterndData?.filter?.((item: any) => {
          return item.flow_name !== null;
        }) || [];

      const chartDom = ref.current;
      charInstance.current = echarts.init(chartDom);

      // Extract unique timestamps and format as needed
      const uniqueTimestamps = [
        ...new Set(data.map((item) => new Date(item.timestamp).toISOString())),
      ];

      const uniqueIds = [...new Set(data.map((item) => item.id))];

      const days = [...new Set(data.map((item) => item.flow_name))];

      const processedData = data.map((item) => {
        const timestampIndex = uniqueTimestamps.indexOf(
          new Date(item.timestamp).toISOString()
        );
        const dayIndex = days.indexOf(item.flow_name);
        let statusValue;

        switch (item.status) {
          case "up":
            statusValue = 1;
            break;
          case "partially up":
            statusValue = 0.5;
            break;
          case "down":
            statusValue = 0;
            break;
          default:
            statusValue = "-";
        }

        return [timestampIndex, dayIndex, statusValue];
      });

      const option = {
        tooltip: {
          position: "top",
        },
        grid: {
          left: "104px",
          right: "8px",
          bottom: "50px",
          containLabel: false,
        },
        xAxis: {
          type: "category",
          data: uniqueTimestamps,
          splitArea: {
            show: true,
          },
          axisLabel: {
            formatter: function (value) {
              const date = new Date(value);
              return date.getHours() + ":" + date.getMinutes();
            },
          },
        },
        yAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
          },
          data: days,
          splitArea: {
            show: true,
          },
        },
        visualMap: {
          min: 0,
          max: 1,
          calculable: true,
          show: false, // Set this to false to hide the visual map
          inRange: {
            color: ["red", "orange", "green"], //From smaller to bigger value ->
          },
          pieces: [
            { value: 1, label: "Up", color: "green" }, // Green for 'up'
            { value: 0.5, label: "Partially Up", color: "orange" }, // Orange for 'partially up'
            { value: 0, label: "Down", color: "red" }, // Red for 'down'
          ],
        },
        series: [
          {
            name: "Health",
            type: "heatmap",
            data: processedData,
            visualMap: false,
            label: {
              show: false,
            },
            itemStyle: {
              borderColor: "white",
              outline: "1px",
              borderType: "solid",
            },
          },
        ],
      };

      charInstance.current.setOption(option);

      charInstance.current.on("click", "series", (data: any) => {
        //navigate
        console.log(data);
        setSearchParams({
          component: "drawer-right",
          flowName: `1`,
        });
      });

      resizer = () => {
        charInstance.current.resize();
      };

      window.addEventListener("resize", resizer);
    }
    return () => {
      window.removeEventListener("resize", resizer);
    };
  }, [unfilterndData]);

  if (error) return <div>Error loading data</div>;
  if (!unfilterndData) return <div>Loading...</div>;

  return (
    <Box>
      <Box ref={ref} style={{ height: "250px" }} p={"0.8rem"} />
    </Box>
  );
};

export default HeatmapChart;
