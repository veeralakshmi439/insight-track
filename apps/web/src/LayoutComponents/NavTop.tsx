import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
          <Link to={"/health"}>
            <Button variant={"ghost"}>Health</Button>
          </Link>
          <Link to={"/customer-experience"}>
            <Button variant={"ghost"}>Customer Experence </Button>
          </Link>
          <Link to={"/analytics"}>
            <Button variant={"ghost"}>Analytics</Button>
          </Link>
          <Link to={"/delivery"}>
            <Button variant={"ghost"}>Delivery</Button>
          </Link>
          <Link to={"/general-assestnet"}>
            <Button variant={"ghost"}>General Assestnet</Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};
