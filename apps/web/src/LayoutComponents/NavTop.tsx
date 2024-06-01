import { Box, Button, Container, Flex } from "@chakra-ui/react";

export const NavTop = () => {
  return (
    <Box
      h={"40px"}
      sx={{
        borderBottom: "1px solid #efefef",
      }}
    >
      <Container maxW={"1000px"}>
        <Flex>
          <Button variant={'ghost'}>Health</Button>
          <Button variant={'ghost'}>Customer Experence </Button>
          <Button variant={'ghost'}>Analytics</Button>
          <Button variant={'ghost'}>Delevery</Button>
        </Flex>
      </Container>
    </Box>
  );
};
