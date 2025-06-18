import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import theme from "./theme.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
        </ChakraProvider>
    </StrictMode>
);
