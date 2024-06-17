import {
  Box,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import DeleveryFlowLoad from "../charts/DeleveryFlowLoad";
import DeleveryFlowTime from "../charts/DeleveryFlowTIme";
import DeleveryFlowVelocity from "../charts/DeleveryFlowVelocity";
import FlowDistributionChart from "../charts/DeleveryFlowDistrubution";
import DeleveryUserStoriesTable from "../charts/DeleveryUserStoriesTable";

const AgileFlowMetrics = () => {
  return (
    <Grid gridGap={["0.8rem"]} rowGap={["0.8rem"]} p={["0.8rem"]}>
      <GridItem>
        <Box p={4} bg={"white"}>
          <Tabs variant="enclosed" isLazy>
            <TabList>
              <Tab>Distrubution</Tab>
              <Tab>Lead Time</Tab>
              <Tab>Velocity</Tab>
              <Tab>Flow Load</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <FlowDistributionChart />
              </TabPanel>
              <TabPanel w={"100%"}>
                <DeleveryFlowTime />
              </TabPanel>
              <TabPanel>
                <DeleveryFlowVelocity />
              </TabPanel>
              <TabPanel w={"100%"}>
                <DeleveryFlowLoad />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
      <GridItem>
        <DeleveryUserStoriesTable />
      </GridItem>
    </Grid>
  );
};

export default AgileFlowMetrics;
