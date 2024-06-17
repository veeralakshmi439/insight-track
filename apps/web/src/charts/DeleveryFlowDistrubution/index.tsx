import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Box } from '@chakra-ui/react';
import useSWR from 'swr';
import data from './data.json';

const fetcher = (url) => {
    return Promise.resolve(data);
};

const FlowDistributionChart = () => {
  const chartRef = useRef(null);
  const { data, error } = useSWR('/api/data5', fetcher);

  useEffect(() => {
    if (data && !error) {
      const chartInstance = echarts.init(chartRef.current);

      const option = {
        title: {
          text: 'Flow Distribution',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: (params) => {
            let tooltipText = `${params[0].axisValue}<br/>`;
            params.forEach((param) => {
              tooltipText += `${param.marker} ${param.seriesName}: ${param.value}%<br/>`;
            });
            return tooltipText;
          },
        },
        legend: {
          bottom: 0,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: data.categories,
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} %',
          },
        },
        series: [
          {
            name: 'Stories',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}%',
            },
            data: data.stories,
            itemStyle: {
              color: '#4A90E2',
            },
          },
          {
            name: 'Enablers',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}%',
            },
            data: data.enablers,
            itemStyle: {
              color: '#D0021B',
            },
          },
          {
            name: 'Maintenance',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}%',
            },
            data: data.maintenance,
            itemStyle: {
              color: '#F5A623',
            },
          },
        ],
      };

      chartInstance.setOption(option);

      const handleResize = () => {
        chartInstance.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.dispose();
      };
    }
  }, [data, error]);

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  return <Box ref={chartRef} width="100%" height="400px" />;
};

export default FlowDistributionChart;
