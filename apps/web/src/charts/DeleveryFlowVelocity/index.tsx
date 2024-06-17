import React, { useEffect, useRef } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import * as echarts from 'echarts';
import useSWR from 'swr';
import data from './data.json';

// Fetcher function for useSWR
const fetcher = url => {
    return Promise.resolve(data);
};

const VelocityChart = () => {
  const chartRef = useRef(null);
  const { data, error } = useSWR('/api/velocity', fetcher);

  useEffect(() => {
    if (data) {
      const chart = echarts.init(chartRef.current);

      const options = {
        title: {
          text: 'Velocity Chart',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['Story Points'],
          bottom: 0,
        },
        xAxis: {
          type: 'category',
          data: data.iterations,
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 40,
          interval: 10,
          axisLabel: {
            formatter: '{value} pts',
          },
        },
        series: [
          {
            name: 'Story Points',
            type: 'bar',
            data: data.storyPoints,
            itemStyle: {
              color: '#2c7a7b',
            },
          },
          {
            name: 'Average Velocity',
            type: 'line',
            data: new Array(data.iterations.length).fill(data.averageVelocity),
            lineStyle: {
              type: 'dashed',
              color: '#e53e3e',
            },
            label: {
              show: true,
              formatter: `Average Velocity: ${data.averageVelocity} pts`,
              position: 'top',
              backgroundColor: '#e53e3e',
              padding: [2, 4],
              borderRadius: 2,
              color: '#fff',
            },
          },
        ],
      };

      chart.setOption(options);

      return () => {
        chart.dispose();
      };
    }
  }, [data]);

  if (error) return <Text>Error loading data</Text>;
  if (!data) return <Text>Loading...</Text>;

  return (
    <Box>
      <Heading size="md">Flow Velocity</Heading>
      <Box ref={chartRef} h="400px" />
    </Box>
  );
};

export default VelocityChart;
