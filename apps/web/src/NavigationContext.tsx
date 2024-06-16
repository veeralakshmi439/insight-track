import { Dispatch, createContext } from "react";

export const NavigationStateContext = createContext({});

export const NavigationDispatcherContext = createContext<null | Dispatch<any>>(null);
