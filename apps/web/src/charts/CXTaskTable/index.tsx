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
  Avatar
} from "@chakra-ui/react";
import { FaBug, FaCheckSquare, FaTasks, FaLink } from "react-icons/fa";
import data from './data.json';

const issueTypeIcon = (type) => {
  switch (type) {
    case 'bug':
      return <FaBug />;
    case 'task':
      return <FaTasks />;
    case 'improvement':
      return <FaCheckSquare />;
    default:
      return null;
  }
};

const App = () => {
  return (
    <Box p={5} bg={'white'}>
      <TableContainer
        height="400px"
        overflowY="auto"
      >
        <Table colorScheme="teal" size="sm">
          <Thead position="sticky" top={0} bg="white" zIndex={1}>
            <Tr>
              <Th>Type</Th>
              <Th>Key</Th>
              <Th>Summary</Th>
              <Th>Web Link</Th>
              <Th>Assignee</Th>
              <Th>Reporter</Th>
              <Th>Project</Th>
              <Th>Completion Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((story, index) => (
              <Tr key={index} height="25px">
                <Td>{issueTypeIcon(story.type)}</Td>
                <Td>{story.key}</Td>
                <Td>{story.summary}</Td>
                <Td>
                  <a href={story.webLink} target="_blank" rel="noopener noreferrer">
                    <HStack>
                      <FaLink />
                      <Text>{story.webLink}</Text>
                    </HStack>
                  </a>
                </Td>
                <Td>{story.assignee}</Td>
                <Td>
                  <HStack>
                    <Avatar size="xs" name={story.reporter} />
                    <Text>{story.reporter}</Text>
                  </HStack>
                </Td>
                <Td>{story.project}</Td>
                <Td>{story.completionDate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default App;
