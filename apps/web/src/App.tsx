import { Box, Flex, GridItem, Grid } from "@chakra-ui/react";
import HeatMap from "./charts/HeatMap";
import { useReducer, useState } from "react";
import { NavTop } from "./LayoutComponents/NavTop";
import { NavLeft } from "./LayoutComponents/NavLeft";
import CustmerEffectedDueToTechnicalErrors from "./charts/CustmerEffectedDueToTechnicalErrors";
import {
  NavigationDispatcherContext,
  NavigationStateContext,
} from "./NavigationContext";
import { DrawerRight } from "./LayoutComponents/DrawerRight";
import TimeRangePicker from "./LayoutComponents/Toolbar";
import dayjs from "dayjs";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import Home from './pages/Home';
import Health from './pages/Health';
import CustomerExperience from './pages/CustomerExperience';
import Analytics from './pages/Analytics';
import Delivery from './pages/Delivery';

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
        <Router>
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
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/health" element={<Health />} />
                  <Route
                    path="/customer-experience"
                    element={<CustomerExperience />}
                  />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/delivery" element={<Delivery />} />
                </Routes>
              </Box>
            </Flex>
            <DrawerRight />
          </Box>
        </Router>
      </NavigationDispatcherContext.Provider>
    </NavigationStateContext.Provider>
  );
}

export default App;
