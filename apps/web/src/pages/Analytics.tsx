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
import dayjs from "dayjs";

function Home() {
 
  return <Box>Analytics</Box>;
}

export default Home;
