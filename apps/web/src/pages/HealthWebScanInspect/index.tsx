import {
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import DynamicComponent from "../../DynamicComponent";

function HealthWebScaninspect() {
  return (
    <Box>
      <Grid gridGap={["0.8rem"]} rowGap={["0.8rem"]} p={["0.8rem"]}>
        <GridItem>
          <Box p={4} bg={"white"}>
            <DynamicComponent name={'HLWebScanInsights'}/>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default HealthWebScaninspect;
