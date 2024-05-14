import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./Theme/globalThemes";
import ChatProvider from "./Context/chatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider theme={theme}>
    <ChatProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChatProvider>
  </ChakraProvider>
);