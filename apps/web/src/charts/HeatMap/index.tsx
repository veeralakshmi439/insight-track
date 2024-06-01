/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Box, Button } from "@chakra-ui/react";
import { NavigationDispatcherContext } from "../../NavigationContext";

export default () => {
  const ref = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let resizer: any;

  const dispatchDrawerState = useContext(NavigationDispatcherContext);

  useEffect(() => {
    if (ref.current) {
      const chartDom = ref.current;
      const myChart = echarts.init(chartDom);

      // prettier-ignore
      const hours = [
    '12a', '1a', '2a', '3a', '4a', '5a', '6a',
    '7a', '8a', '9a', '10a', '11a',
    '12p', '1p', '2p', '3p', '4p', '5p',
    '6p', '7p', '8p', '9p', '10p', '11p'
];
      // prettier-ignore
      const days = [
    'ASDA Groceries Home', 'Tesco Store Home', 'Cineworld Home',
    'Boots Home', 'Supredrug Home', 'Liddle Home', 'Beautypie Product Navigation'
];
      // prettier-ignore
      const data = [
        [0, 0, 1], [0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [0, 5, 1], [0, 6, 1], [0, 7, 1], [0, 8, 1], [0, 9, 1], [0, 10, 1], [0, 11, 1], [0, 12, 1], [0, 13, 1], [0, 14, 1], [0, 15, 1], [0, 16, 1], [0, 17, 1], [0, 18, 1], [0, 19, 1], [0, 20, 1], [0, 21, 1], [0, 22, 1], [0, 23, 1],
        [1, 0, 1], [1, 1, 1], [1, 2, 0], [1, 3, 1], [1, 4, 1], [1, 5, 1], [1, 6, 1], [1, 7, 1], [1, 8, 1], [1, 9, 1], [1, 10, 0], [1, 11, 1], [1, 12, 1], [1, 13, 0], [1, 14, 1], [1, 15, 1], [1, 16, 1], [1, 17, 1], [1, 18, 1], [1, 19, 1], [1, 20, 1], [1, 21, 1], [1, 22, 1], [1, 23, 1],
        [2, 0, 1], [2, 1, 1], [2, 2, 1], [2, 3, 1], [2, 4, 0], [2, 5, 1], [2, 6, 1], [2, 7, 1], [2, 8, 1], [2, 9, 1], [2, 10, 1], [2, 11, 1], [2, 12, 1], [2, 13, 1], [2, 14, 1], [2, 15, 0], [2, 16, 1], [2, 17, 1], [2, 18, 1], [2, 19, 1], [2, 20, 1], [2, 21, 1], [2, 22, 1], [2, 23, 1],
        [3, 0, 1], [3, 1, 1], [3, 2, 1], [3, 3, 1], [3, 4, 1], [3, 5, 1], [3, 6, 1], [3, 7, 1], [3, 8, 1], [3, 9, 1], [3, 10, 1], [3, 11, 1], [3, 12, 1], [3, 13, 1], [3, 14, 1], [3, 15, 1], [3, 16, 1], [3, 17, 1], [3, 18, 1], [3, 19, 1], [3, 20, 1], [3, 21, 1], [3, 22, 1], [3, 23, 1],
        [4, 0, 1], [4, 1, 1], [4, 2, 1], [4, 3, 1], [4, 4, 0], [4, 5, 1], [4, 6, 1], [4, 7, 1], [4, 8, 1], [4, 9, 1], [4, 10, 1], [4, 11, 1], [4, 12, 1], [4, 13, 1], [4, 14, 1], [4, 15, 0], [4, 16, 1], [4, 17, 1], [4, 18, 1], [4, 19, 1], [4, 20, 1], [4, 21, 1], [4, 22, 1], [4, 23, 1],
        [5, 0, 1], [5, 1, 1], [5, 2, 0], [5, 3, 1], [5, 4, 1], [5, 5, 1], [5, 6, 1], [5, 7, 1], [5, 8, 1], [5, 9, 1], [5, 10, 0], [5, 11, 1], [5, 12, 1], [5, 13, 0], [5, 14, 1], [5, 15, 1], [5, 16, 1], [5, 17, 1], [5, 18, 1], [5, 19, 1], [5, 20, 1], [5, 21, 1], [5, 22, 1], [5, 23, 1],
        [6, 0, 1], [6, 1, 1], [6, 2, 1], [6, 3, 1], [6, 4, 1], [6, 5, 1], [6, 6, 1], [6, 7, 1], [6, 8, 1], [6, 9, 1], [6, 10, 0], [6, 11, 1], [6, 12, 1], [6, 13, 1], [6, 14, 1], [6, 15, 1], [6, 16, 1], [6, 17, 1], [6, 18, 1], [6, 19, 1], [6, 20, 1], [6, 21, 1], [6, 22, 1], [6, 23, 1]
      ].map(function (item) {
        return [item[1], item[0], item[2] || '-'];
      });
      const option = {
        tooltip: {
          position: "top",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: hours,
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          type: "category",
          data: days,
          splitArea: {
            show: true,
          },
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          show: false, // Set this to false to hide the visual map
          pieces: [
            { value: 1, label: 'Up', color: 'red' }, // Green for 'up'
            { value: 0.5, label: 'Partially Down', color: 'red' }, // Orange for 'partially down'
            { value: 0, label: 'Down', color: 'red' } // Red for 'down'
          ],
        },
        series: [
          {
            name: "Punch Card",
            type: "heatmap",
            data: data,
            visualMap: false,
            label: {
              show: true,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      myChart.setOption(option);

      myChart.on("click", "series", () => {
        dispatchDrawerState({
          type: "navigatin",
          payload: {
            isOpen: true,
          },
        });
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
      resizer = () => {
        myChart.resize();
      };

      window.addEventListener("resize", resizer);
    }
    return () => {
      window.removeEventListener("resize", resizer);
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <Box>
      <Box ref={ref} style={{ height: "500px" }} p={"0.8rem"} />
    </Box>
  );
};
