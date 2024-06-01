import { Box, Button, Flex } from "@chakra-ui/react";

export const NavLeft = () => {
  return (
    <Box
      w={"40px"}
      sx={{
        height: "100vh",
        borderRight: "1px solid #efefef",
      }}
    >
      <Flex flexDirection={"column"}>
        <Button variant={"ghost"}>H</Button>
        <Button variant={"ghost"}>W</Button>
      </Flex>
    </Box>
  );
};
