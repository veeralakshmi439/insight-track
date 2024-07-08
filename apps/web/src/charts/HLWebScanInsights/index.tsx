import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import HealthWebScanScreenshot from "../../UtilComponents/HealthWebScanScreenshot";

function HealthWebScanInsights() {
  return (
    <Box>
      <Flex alignItems={"center"}>
        <Box>
          <HealthWebScanScreenshot
            flowName={"ASDA%20Home"}
            timestamp={"2024-07-03T14:04:00.016Z"}
          />
        </Box>
        <Box>
            Insights
        </Box>
      </Flex>
    </Box>
  );
}

export default HealthWebScanInsights;
