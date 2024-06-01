import { Box, Flex, GridItem, Grid } from "@chakra-ui/react";
import HeatMap from "./charts/HeatMap";
import { useReducer } from "react";
import { NavTop } from "./LayoutComponents/NavTop";
import { NavLeft } from "./LayoutComponents/NavLeft";
import CustmerEffectedDueToTechnicalErrors from "./charts/CustmerEffectedDueToTechnicalErrors";
import {
  NavigationDispatcherContext,
  NavigationStateContext,
} from "./NavigationContext";
import { DrawerRight } from "./LayoutComponents/DrawerRight";

function App() {
  const [drawerState, dispatch] = useReducer(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state, action: any) => {
      return action.payload;
    },
    {
      isOpen: false,
    }
  );

  return (
    <NavigationStateContext.Provider value={drawerState}>
      <NavigationDispatcherContext.Provider value={dispatch}>
        <Box>
          <NavTop />
          <Flex>
            <Box h={"100vh"}>
              <NavLeft />
            </Box>
            <Box
              maxH={"100vh"}
              bg={"#efefef"}
              sx={{
                width: "calc(100% - 50px)",
                overflowY: "scroll",
              }}
            >
              <Grid gridGap={["0.8rem"]} rowGap={["0.8rem"]} p={["0.8rem"]}>
                <GridItem colStart={[1]} colEnd={11} bg={"white"}>
                  <HeatMap />
                </GridItem>
                <GridItem colStart={[1]} colEnd={11} bg={"white"}>
                  <CustmerEffectedDueToTechnicalErrors />
                </GridItem>
              </Grid>
            </Box>
          </Flex>
          <DrawerRight/>
        </Box>
      </NavigationDispatcherContext.Provider>
    </NavigationStateContext.Provider>
  );
}

export default App;
