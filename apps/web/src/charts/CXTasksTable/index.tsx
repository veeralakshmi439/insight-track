import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Progress,
  HStack,
  Text,
} from "@chakra-ui/react";
import generateRandomTasks from './data'; // Assuming you have the data generation function in a file named data.js

const App = () => {
  const [data, setData] = useState(generateRandomTasks(100)); // Generate 100 random tasks
  const [sortConfig, setSortConfig] = useState(null);

  const onSort = (column) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: column, direction });
    setData((prevData) => {
      return [...prevData].sort((a, b) => {
        if (a[column] < b[column]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[column] > b[column]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    });
  };

  const getSortIcon = (column) => {
    if (!sortConfig || sortConfig.key !== column) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <Box p={5} bg={'white'}>
      <TableContainer height="400px" overflowY="auto">
        <Table colorScheme="teal" size="sm">
          <Thead position="sticky" top={0} bg="white" zIndex={1}>
            <Tr>
              <Th onClick={() => onSort('taskId')}>Task ID {getSortIcon('taskId')}</Th>
              <Th onClick={() => onSort('duration')}>Duration {getSortIcon('duration')}</Th>
              <Th onClick={() => onSort('exceptions')}>Exceptions {getSortIcon('exceptions')}</Th>
              <Th onClick={() => onSort('userId')}>User ID {getSortIcon('userId')}</Th>
              <Th onClick={() => onSort('taskName')}>Task Name {getSortIcon('taskName')}</Th>
              <Th onClick={() => onSort('status')}>Status {getSortIcon('status')}</Th>
              <Th onClick={() => onSort('startTime')}>Start Time {getSortIcon('startTime')}</Th>
              <Th onClick={() => onSort('endTime')}>End Time {getSortIcon('endTime')}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((task, index) => (
              <Tr key={index} height="25px">
                <Td>{task.taskId}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Text>{parseInt(task.duration)}</Text>
                    <Progress value={parseInt(task.duration)} max={5} colorScheme="teal" size="sm" width="100%" />
                  </HStack>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Text>{task.exceptions}</Text>
                    <Progress value={task.exceptions} max={5} colorScheme="red" size="sm" width="100%" />
                  </HStack>
                </Td>
                <Td>{task.userId}</Td>
                <Td>{task.taskName}</Td>
                <Td>{task.status}</Td>
                <Td>{task.startTime}</Td>
                <Td>{task.endTime}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default App;
