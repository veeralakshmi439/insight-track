import { Box, Flex, GridItem, Grid } from "@chakra-ui/react";
import HeatMap from "../charts/HeatMap";
import { useReducer, useState } from "react";
import { NavTop } from "../LayoutComponents/NavTop";
import { NavLeft } from "../LayoutComponents/NavLeft";
import CustmerEffectedDueToTechnicalErrors from "../charts/CustmerEffectedDueToTechnicalErrors";
import {
  NavigationDispatcherContext,
  NavigationStateContext,
} from "../NavigationContext";
import { DrawerRight } from "../LayoutComponents/DrawerRight";
import TimeRangePicker from "../LayoutComponents/Toolbar";
import dayjs from 'dayjs';

function Health() {
  const [drawerState, dispatch] = useReducer(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state, action: any) => {
      return action.payload;
    },
    {
      isOpen: false,
    }
  );

  const now = dayjs();
  const initialFrom = now.subtract(1, 'hour').toISOString();
  const initialTo = now.toISOString();

  const [timeRange, setTimeRange] = useState({ from: initialFrom, to: initialTo });


  const handleTimeRangeChange = ({ from, to }) => {
    setTimeRange({ from, to });
  };

  return (
    <NavigationStateContext.Provider value={drawerState}>
      <NavigationDispatcherContext.Provider value={dispatch}>
        <Box>
          <Flex>
            <Box
              maxH={"100vh"}
              bg={"#efefef"}
              sx={{
                width: "calc(100%)",
                overflowY: "scroll",
              }}
            >
              <Grid gridGap={["0.8rem"]} rowGap={["0.8rem"]} p={["0.8rem"]}>
                <GridItem colStart={[1]} colEnd={11} bg={"white"}>
                  <TimeRangePicker onTimeRangeChange={handleTimeRangeChange}/>
                </GridItem>
                <GridItem colStart={[1]} colEnd={11} bg={"white"}>
                  <HeatMap from={timeRange.from} to={timeRange.to} />
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

export default Health;
