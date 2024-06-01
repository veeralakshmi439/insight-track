import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerFooter,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useContext } from "react";
import {
  NavigationDispatcherContext,
  NavigationStateContext,
} from "../NavigationContext";

export const DrawerRight = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const drawerState : any = useContext(NavigationStateContext);
  const drawerDispatch : any = useContext(NavigationDispatcherContext);

  return (
    <Box>
      <Drawer
        size={'xl'}
        isOpen={drawerState.isOpen}
        placement="right"
        onClose={() => {
          drawerDispatch({
            payload: {
              isOpen: false
            }
          })
        }}
        onOverlayClick={() => {
          drawerDispatch({
            payload: {
              isOpen: false
            }
          })
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />


          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
