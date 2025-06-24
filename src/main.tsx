import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import theme from "./theme.ts";
import appRouter from "./appRoutes.tsx";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ChakraProvider theme={theme}>
            <RouterProvider router={appRouter} />
        </ChakraProvider>
    </StrictMode>
);
