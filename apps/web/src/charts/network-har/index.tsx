import { Box, Text } from "@chakra-ui/react";
import { useHTTP } from "../../uitls/useHTTP";

const NetworkWaterfall = ({ scanId }: { scanId: string }) => {
  const { data, error } = useHTTP(
    `/health/${scanId}`
  );

  return (
    <Box p={4}>
      <Text>Network Waterfall content goes here</Text>
      {JSON.stringify(data)}
    </Box>
  );
};

export default NetworkWaterfall;
