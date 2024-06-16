import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "./Login/AuthProvider.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
