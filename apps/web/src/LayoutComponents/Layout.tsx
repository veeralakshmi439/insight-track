import { Box, Flex } from "@chakra-ui/react";
import { Router, useSearchParams, Outlet } from "react-router-dom";
import {
  NavigationDispatcherContext,
  NavigationStateContext,
} from "../NavigationContext";
import { NavLeft } from "./NavLeft";
import { NavTop } from "./NavTop";
import { useReducer, useState } from "react";
import dayjs from "dayjs";
import { DrawerRight } from "./DrawerRight";
import DynamicPage from "../DynamicPage";

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

  const [searchParams, setSearchParams] = useSearchParams();
  const component = searchParams.get("component");
  const params = searchParams.get("searchParams");

  return (
    <NavigationStateContext.Provider value={drawerState}>
      <NavigationDispatcherContext.Provider value={dispatch}>
        <Box>
          <NavTop />
          <Flex>
            <Box
              maxH={"100vh"}
              w={"100%"}
              bg={"#efefef"}
              sx={{
                overflowY: "scroll",
              }}
            >
              <Outlet />
              {component === "drawer-right" ? <DrawerRight scanId={'1'} ><DynamicPage name={'CXFeature'} /></DrawerRight> : null}
            </Box>
          </Flex>
        </Box>
      </NavigationDispatcherContext.Provider>
    </NavigationStateContext.Provider>
  );
};

export default Layout;
