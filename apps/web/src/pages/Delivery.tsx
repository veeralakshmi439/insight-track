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
import DynamicComponent from "../DynamicComponent";

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
                <DynamicComponent name={"DeleveryFlowDistrubution"} />
              </TabPanel>
              <TabPanel w={"100%"}>
                <DynamicComponent name={"DeleveryFlowTIme"} />
              </TabPanel>
              <TabPanel>
                <DynamicComponent name={"DeleveryFlowVelocity"} />
              </TabPanel>
              <TabPanel w={"100%"}>
                <DynamicComponent name={"DeleveryFlowLoad"} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
      <GridItem>
        <DynamicComponent name={"DeleveryUserStoriesTable"} />
      </GridItem>
    </Grid>
  );
};

export default AgileFlowMetrics;
