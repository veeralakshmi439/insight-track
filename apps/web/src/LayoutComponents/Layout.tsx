import { Box, Flex } from "@chakra-ui/react";
import { Router, Outlet } from "react-router-dom";
import {
  NavigationDispatcherContext,
  NavigationStateContext,
} from "../NavigationContext";
import { DrawerRight } from "./DrawerRight";
import { NavLeft } from "./NavLeft";
import { NavTop } from "./NavTop";
import { useReducer, useState } from "react";
import dayjs from "dayjs";

export const Layout = () => {
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
  const initialFrom = now.subtract(1, "hour").toISOString();
  const initialTo = now.toISOString();

  const [timeRange, setTimeRange] = useState({
    from: initialFrom,
    to: initialTo,
  });

  const handleTimeRangeChange = ({ from, to }) => {
    setTimeRange({ from, to });
  };

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
              <Outlet />
            </Box>
          </Flex>
          <DrawerRight scanId={""} />
        </Box>
      </NavigationDispatcherContext.Provider>
    </NavigationStateContext.Provider>
  );
};

export default Layout;
