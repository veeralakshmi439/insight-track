import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';

import data from './data.json';

const DivergingBar = ({
  direction,
  color,
  percent,
}: {
  direction: string;
  color: string;
  percent: number;
}) => {
  return (
    <HStack w="100%" h="20px" position="relative" justifyContent={direction}>
      <Box w={`${percent}%`} bg={color} h="100%" />
    </HStack>
  );
};

const App = () => {
  return (
    <Box p={5} bg={'white'}>
      <TableContainer
        height="500px" // Adjust the height as needed
        overflowY="auto"
      >
        <Table colorScheme="teal">
          <Thead position="sticky" top={0} bg="white" zIndex={1}>
            <Tr>
              <Th>Flow Name</Th>
              <Th>Exit Rate</Th>
              <Th>Completion Rate</Th>
              <Th isNumeric>Exceptions</Th>
              <Th isNumeric>User Exceptions</Th>
              <Th isNumeric>Number of Unique Customers</Th>
              <Th isNumeric>Total Number of Flows</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((flow, index) => (
              <Tr key={index} height="25px">
                <Td p={'0.2rem'}><Link to={'/customer-experience/features/1'}>{flow.flowName}</Link></Td>
                <Td>
                  <DivergingBar
                    direction="flex-end"
                    color="red.400"
                    percent={flow.exitRate}
                  />
                  <Text>{flow.exitRate}%</Text>
                </Td>
                <Td>
                  <DivergingBar
                    direction="flex-start"
                    color="green.400"
                    percent={flow.completionRate}
                  />
                  <Text>{flow.completionRate}%</Text>
                </Td>
                <Td isNumeric>{flow.exceptions}</Td>
                <Td isNumeric>{flow.userExceptions}</Td>
                <Td isNumeric>{flow.uniqueCustomers}</Td>
                <Td isNumeric>{flow.totalFlows}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default App;
