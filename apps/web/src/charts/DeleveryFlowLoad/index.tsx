import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Box, Spinner } from '@chakra-ui/react';
import useSWR from 'swr';
import data from './data.json';

const fetcher = (url) => {
    return Promise.resolve(data);
};

const AreaChart = () => {
  const chartRef = useRef(null);
  const { data, error } = useSWR('/api/data1', fetcher);

  useEffect(() => {
    if (!data) return;

    const chart = echarts.init(chartRef.current);
    
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Done', 'Implementing', 'Ready', 'Analysis', 'Funnel'],
        bottom: 0
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: data.categories
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Done',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: data.done
        },
        {
          name: 'Implementing',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: data.implementing
        },
        {
          name: 'Ready',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: data.ready
        },
        {
          name: 'Analysis',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: data.analysis
        },
        {
          name: 'Funnel',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: data.funnel
        }
      ]
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [data]);

  if (error) return <Box  width="100%"><div>Error loading data...</div></Box>;
  if (!data) return <Box  width="100%"><Spinner size="xl" /></Box>;

  return <Box ref={chartRef} width="100%" height="400px" />;
};

export default AreaChart;
