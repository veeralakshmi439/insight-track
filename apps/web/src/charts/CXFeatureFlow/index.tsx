import React, { useEffect, useRef } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import useSWR from 'swr';
import * as echarts from 'echarts';

const fetcher = (url) => {
    return Promise.resolve(generateRandomData());
};

const generateRandomData = () => {
    const nodes = [
        { name: 'Home' },
        { name: 'Product' },
        { name: 'Cart' },
        { name: 'Checkout' },
        { name: 'Exit' }
    ];

    const links = [
        { source: 'Home', target: 'Product', value: Math.floor(Math.random() * 100) },
        { source: 'Product', target: 'Cart', value: Math.floor(Math.random() * 100) },
        { source: 'Cart', target: 'Checkout', value: Math.floor(Math.random() * 100) },
        { source: 'Checkout', target: 'Exit', value: Math.floor(Math.random() * 100) },
        { source: 'Product', target: 'Exit', value: Math.floor(Math.random() * 100) },
        { source: 'Cart', target: 'Exit', value: Math.floor(Math.random() * 100) },
    ];

    return { nodes, links };
};

const SankeyChart = () => {
    const chartRef = useRef(null);

    const { data, error } = useSWR('/api/user-flow', fetcher, {
        fallbackData: generateRandomData()
    });

    useEffect(() => {
        if (chartRef.current && data) {
            const chartInstance = echarts.init(chartRef.current);

            const option = {
                title: {
                    text: 'User Flow Exit Behavior'
                },
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [
                    {
                        type: 'sankey',
                        layout: 'none',
                        emphasis: {
                            focus: 'adjacency'
                        },
                        data: data.nodes,
                        links: data.links,
                        lineStyle: {
                            color: 'source',
                            curveness: 0.5
                        }
                    }
                ]
            };

            chartInstance.setOption(option);

            return () => {
                chartInstance.dispose();
            };
        }
    }, [data]);

    if (error) return <Box>Error loading data</Box>;
    if (!data) return <Spinner size="xl" />;

    return <Box ref={chartRef} height="600px" bg={'white'}/>;
};

export default SankeyChart;
