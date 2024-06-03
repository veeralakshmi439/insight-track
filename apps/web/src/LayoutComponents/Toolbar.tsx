import React from 'react';
import { ChakraProvider, Box, Menu, MenuButton, MenuList, MenuItem, Button, Flex } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';

const TimeRangePicker = ({ onTimeRangeChange }) => {
    const handleTimeRangeClick = (duration) => {
      const now = dayjs();
      const from = now.subtract(duration.amount, duration.unit).toISOString();
      const to = now.toISOString();
  
      onTimeRangeChange({ from, to });
    };
  
    const timeRanges = [
      { label: '5 mins', amount: 5, unit: 'minute' },
      { label: '10 mins', amount: 10, unit: 'minute' },
      { label: '15 mins', amount: 15, unit: 'minute' },
      { label: '28 mins', amount: 28, unit: 'minute' },
      { label: '1 hour', amount: 1, unit: 'hour' },
      { label: '4 hours', amount: 4, unit: 'hour' },
      { label: '12 hours', amount: 12, unit: 'hour' },
      { label: '24 hours', amount: 24, unit: 'hour' },
      { label: '7 days', amount: 7, unit: 'day' },
    ];
  
    return (
      <ChakraProvider>
        <Box bg="gray.100" p={4} rounded="md" boxShadow="md">
          <Flex justify="space-between" align="center">
            <Box>
              {/* Your toolbar content goes here */}
              Toolbar Content
            </Box>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} h="40px">
                Select Time Range
              </MenuButton>
              <MenuList>
                {timeRanges.map((range) => (
                  <MenuItem key={range.label} onClick={() => handleTimeRangeClick(range)}>
                    {range.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </ChakraProvider>
    );
  };
  
export default TimeRangePicker;
