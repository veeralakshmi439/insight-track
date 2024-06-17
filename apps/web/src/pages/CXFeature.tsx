import {
  Box,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Card,
} from "@chakra-ui/react";
import CXFeatureFlow from "../charts/CXFeatureFlow";
import CXCompleationRate from "../charts/CXCompleationRate";
import CXTskTable from "../charts/CXTasksTable";

function Home() {
  return (
    <Box>
      <Grid gridGap={["0.8rem"]} rowGap={["0.8rem"]} p={["0.8rem"]}>
        <GridItem>
          <FilterPanel />
        </GridItem>
        <GridItem>
          {" "}
          <Box p={4} bg={"white"}>
            <Tabs variant="enclosed" isLazy>
              <TabList>
                <Tab>Compleation Rate</Tab>
                <Tab>Behavour</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Card >
                    <CXCompleationRate />
                  </Card>
                </TabPanel>
                <TabPanel w={"100%"}>
                  <CXFeatureFlow />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>
        <GridItem>
          <CXTskTable />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Home;
const FilterPanel = () => {
  return (
    <Box bg="gray.50" borderBottom="1px solid" borderColor="gray.200" p={0.5}>
      <Flex justify="space-between" align="center">
        <FormControl id="date-range" maxW="160px">
          <FormLabel fontSize="xs" mb={0.5}>
            Date Range
          </FormLabel>
          <Input type="date" size="xs" />
        </FormControl>
        <FormControl id="task-status" maxW="160px">
          <FormLabel fontSize="xs" mb={0.5}>
            Task Status
          </FormLabel>
          <Select placeholder="Select status" size="xs">
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
          </Select>
        </FormControl>
        <FormControl id="user-id" maxW="160px">
          <FormLabel fontSize="xs" mb={0.5}>
            User ID
          </FormLabel>
          <Input type="text" size="xs" />
        </FormControl>
        <FormControl id="task-name" maxW="160px">
          <FormLabel fontSize="xs" mb={0.5}>
            Task Name
          </FormLabel>
          <Select placeholder="Select task" size="xs">
            <option value="task-1">Task 1</option>
            <option value="task-2">Task 2</option>
            <option value="task-3">Task 3</option>
            {/* Add more task names as needed */}
          </Select>
        </FormControl>
        <Button colorScheme="green" size="xs" alignSelf="flex-end" mt={4}>
          Apply
        </Button>
      </Flex>
    </Box>
  );
};
