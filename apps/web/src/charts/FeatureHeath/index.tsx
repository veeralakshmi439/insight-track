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
  StackDirection,
} from "@chakra-ui/react";
import data from './data.json';

const data = [
  {
    flowName: "Flow 1",
    completionRate: 98,
    exitRate: 2,
    exceptions: 1,
    userExceptions: 0,
    uniqueCustomers: 5000,
    totalFlows: 7000,
  },
  {
    flowName: "Flow 2",
    completionRate: 50,
    exitRate: 50,
    exceptions: 3,
    userExceptions: 1,
    uniqueCustomers: 1200,
    totalFlows: 2000,
  },
  // Add more data as needed
];

const DivergingBar = ({
  direction,
  color,
  precent,
}: {
  direction: string;
  color: string;
  precent: number;
}) => {
  return (
    <HStack w="100%" h="20px" position="relative" justifyContent={direction}>
      <Box w={`${precent}%`} bg={color} h="100%" />
    </HStack>
  );
};

const App = () => {
  return (
    <Box p={5} bg={'white'}>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
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
              <Tr key={index}>
                <Td>{flow.flowName}</Td>
                <Td>
                <DivergingBar
                    direction="right"
                    color="red.400"
                    precent={flow.exitRate}
                  />
                  <Text>{flow.exitRate}%</Text>
                </Td>
                <Td>
                  <DivergingBar
                    direction="left"
                    color="green.400"
                    precent={flow.completionRate}
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
