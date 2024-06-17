import React, { useEffect, useLayoutEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Box, Spinner } from '@chakra-ui/react';
import useSWR from 'swr';
import data from './data.json';

const fetcher = (url) => {
   return Promise.resolve(data);
};

const Histogram = () => {
  const chartRef = useRef(null);
  const { data, error } = useSWR('/api/data', fetcher);

  useLayoutEffect(() => {
    if (!data) return;

    const chart = echarts.init(chartRef.current);

    const averageFlowTime = (
      data.flowTimes?.reduce((acc, curr) => acc + curr.count * curr.flowTime, 0) /
      data.flowTimes?.reduce((acc, curr) => acc + curr.count, 0)
    ).toFixed(1);

    const option = {
      
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      title: {
        text: 'Flow Time Histogram',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        name: 'Flow Time (days)',
        data: data.flowTimes.map(item => item.flowTime),
        boundaryGap: true
      },
      yAxis: {
        type: 'value',
        name: 'Feature Count'
      },
      series: [
        {
          name: 'Feature Count',
          type: 'bar',
          data: data.flowTimes.map(item => item.count)
        }
      ],
      markPoint: {
        data: [
          {
            name: 'Average Flow Time',
            coord: [50, 0],
            value: `Average Flow Time: ${averageFlowTime} days`,
            symbolOffset: [0, -20],
            label: {
              show: true,
              formatter: '{c}'
            },
            itemStyle: {
              color: 'orange'
            }
          }
        ]
      }
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [data]);

  if (error) return <div>Error loading data...</div>;
  if (!data) return <Box><Spinner size="xl" /></Box>;

  return <Box ref={chartRef} minW="1000px" h="400px" />;
};

export default Histogram;
